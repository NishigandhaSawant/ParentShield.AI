"""
Transaction Fraud Detection Pipeline
Handles OCR, text extraction, preprocessing, and prediction
"""

import re
import joblib
import numpy as np
from PIL import Image
import pytesseract
import cv2
import os

# Make EasyOCR optional
try:
    import easyocr
    EASYOCR_AVAILABLE = True
except ImportError:
    EASYOCR_AVAILABLE = False
    print("⚠️ EasyOCR not available. Using Pytesseract only.")

class FraudDetectionPipeline:
    """Complete pipeline for fraud detection from image to prediction"""
    
    def __init__(self, model_path='models'):
        """Initialize the pipeline with trained models"""
        self.model_path = model_path
        self.model = None
        self.vectorizer = None
        self.label_encoder = None
        self.easyocr_reader = None
        self.load_models()
    
    def load_models(self):
        """Load trained models"""
        try:
            self.model = joblib.load(f'{self.model_path}/fraud_classifier.pkl')
            self.vectorizer = joblib.load(f'{self.model_path}/vectorizer.pkl')
            self.label_encoder = joblib.load(f'{self.model_path}/label_encoder.pkl')
            print("✅ Models loaded successfully")
        except Exception as e:
            print(f"❌ Error loading models: {e}")
            raise
    
    def preprocess_image(self, image):
        """Preprocess image for better OCR results"""
        # Convert PIL Image to numpy array
        img = np.array(image)
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        
        # Apply thresholding
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Denoise
        denoised = cv2.fastNlMeansDenoising(thresh)
        
        return denoised
    
    def extract_text_pytesseract(self, image):
        """Extract text using Pytesseract"""
        try:
            preprocessed = self.preprocess_image(image)
            text = pytesseract.image_to_string(preprocessed)
            return text.strip()
        except Exception as e:
            print(f"Pytesseract error: {e}")
            return ""
    
    def extract_text_easyocr(self, image):
        """Extract text using EasyOCR"""
        if not EASYOCR_AVAILABLE:
            return ""
        
        try:
            if self.easyocr_reader is None:
                self.easyocr_reader = easyocr.Reader(['en'], gpu=False)
            
            img_array = np.array(image)
            results = self.easyocr_reader.readtext(img_array)
            
            # Combine all detected text
            text = ' '.join([result[1] for result in results])
            return text.strip()
        except Exception as e:
            print(f"EasyOCR error: {e}")
            return ""
    
    def extract_text(self, image):
        """Extract text using both OCR methods and combine"""
        text1 = self.extract_text_pytesseract(image)
        
        # Only use EasyOCR if available
        if EASYOCR_AVAILABLE:
            text2 = self.extract_text_easyocr(image)
        else:
            text2 = ""
        
        # Use the longer text or combine both
        if len(text1) > len(text2):
            final_text = text1
        else:
            final_text = text2 if text2 else text1
        
        # If both have content, combine unique parts
        if text1 and text2 and text1 != text2:
            final_text = f"{text1} {text2}"
        
        return final_text if final_text else "No text detected in image"
    
    def extract_transaction_details(self, text):
        """Extract transaction-specific information"""
        details = {
            'amount': None,
            'transaction_type': None,
            'recipient': None,
            'upi_id': None,
            'account_number': None,
            'transaction_id': None
        }
        
        # Extract amount (Rs, ₹, INR)
        amount_patterns = [
            r'Rs\.?\s*(\d+(?:,\d+)*(?:\.\d{2})?)',
            r'₹\s*(\d+(?:,\d+)*(?:\.\d{2})?)',
            r'INR\s*(\d+(?:,\d+)*(?:\.\d{2})?)',
            r'(?:paid|credited|debited|received|transferred)\s+(?:Rs\.?|₹)?\s*(\d+(?:,\d+)*(?:\.\d{2})?)',
        ]
        
        for pattern in amount_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                amount_str = match.group(1).replace(',', '')
                details['amount'] = float(amount_str)
                break
        
        # Transaction type
        text_lower = text.lower()
        if any(word in text_lower for word in ['debited', 'paid', 'payment', 'withdrawn']):
            details['transaction_type'] = 'Debit'
        elif any(word in text_lower for word in ['credited', 'received', 'deposit', 'refund']):
            details['transaction_type'] = 'Credit'
        elif any(word in text_lower for word in ['transferred', 'transfer', 'sent']):
            details['transaction_type'] = 'Transfer'
        
        # UPI ID
        upi_match = re.search(r'(\d{10})@[\w\.]+', text)
        if upi_match:
            details['upi_id'] = upi_match.group(0)
        
        # Account number (masked)
        acc_match = re.search(r'(?:account|a/c|ac)\s*(?:no\.?|number)?\s*[:\s]*([X\*]{2,}\d{4})', text, re.IGNORECASE)
        if acc_match:
            details['account_number'] = acc_match.group(1)
        
        # Transaction ID / Reference
        txn_patterns = [
            r'(?:txn|transaction|ref|reference|upi ref)\.?\s*(?:id|no|number)?[:\s]*(\w+)',
            r'(?:order|payment)\s*id[:\s]*(\w+)',
        ]
        
        for pattern in txn_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                details['transaction_id'] = match.group(1)
                break
        
        # Recipient name (basic extraction)
        if 'to ' in text_lower:
            recipient_match = re.search(r'to\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)', text)
            if recipient_match:
                details['recipient'] = recipient_match.group(1)
        
        return details
    
    def preprocess_text(self, text):
        """Clean and preprocess text for model"""
        # Convert to lowercase
        text = text.lower()
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def predict_fraud(self, text):
        """Predict if message is fraudulent"""
        if not text or text == "No text detected in image":
            return {
                'verdict': 'error',                    # Changed from 'prediction'
                'confidence': 0.0,
                'probabilities': {},
                'reasoning': 'No text found in the image'  # Changed from 'explanation'
            }
        
        # Preprocess
        processed_text = self.preprocess_text(text)
        
        # Vectorize
        text_vectorized = self.vectorizer.transform([processed_text])
        
        # Predict
        prediction = self.model.predict(text_vectorized)[0]
        probabilities = self.model.predict_proba(text_vectorized)[0]
        
        # Get label
        predicted_label = self.label_encoder.inverse_transform([prediction])[0]
        confidence = probabilities[prediction]
        
        # Get all class probabilities
        all_probs = {}
        for idx, prob in enumerate(probabilities):
            label = self.label_encoder.inverse_transform([idx])[0]
            all_probs[label] = float(prob)
        
        # Generate explanation
        explanation = self.generate_explanation(predicted_label, confidence, text)
        
        return {
            'verdict': predicted_label,            # Changed from 'prediction'
            'confidence': float(confidence),
            'probabilities': all_probs,
            'reasoning': explanation               # Changed from 'explanation'
        }
    
    def generate_explanation(self, label, confidence, text):
        """Generate human-readable explanation"""
        explanations = {
            'legitimate': "✅ This appears to be a legitimate transaction message. It contains standard banking/payment information without suspicious elements.",
            'phishing': "⚠️ DANGER: This is a phishing attempt! It tries to lure you to click malicious links or provide sensitive information. Never click unknown links.",
            'otp_request': "⚠️ FRAUD ALERT: This message requests your OTP, PIN, or CVV. Banks NEVER ask for these details. Do not share any codes!",
            'fake_kyc': "⚠️ SCAM: This is a fake KYC update message. Banks don't ask for KYC through SMS/messages with suspicious links. Verify through official channels.",
            'lottery_scam': "⚠️ SCAM: This is a lottery/prize scam. You cannot win a lottery you never entered. Ignore and delete this message.",
            'blocking_threat': "⚠️ THREAT SCAM: This uses fear tactics by threatening account blocking. Banks provide proper notice through official channels, not threats.",
            'delivery_scam': "⚠️ SCAM: This is a fake delivery charge message. Verify any delivery notifications through official courier websites or apps.",
            'tax_scam': "⚠️ SCAM: This is a fake tax refund message. Income tax department communicates through official portals, not SMS/messages with links."
        }
        
        base_explanation = explanations.get(label, "Unable to determine message type")
        
        # Add confidence level
        if confidence > 0.9:
            confidence_text = f"Very high confidence ({confidence*100:.1f}%)"
        elif confidence > 0.75:
            confidence_text = f"High confidence ({confidence*100:.1f}%)"
        elif confidence > 0.6:
            confidence_text = f"Moderate confidence ({confidence*100:.1f}%)"
        else:
            confidence_text = f"Low confidence ({confidence*100:.1f}%) - Please verify manually"
        
        # Add red flags if fraud detected
        if label != 'legitimate':
            red_flags = []
            text_lower = text.lower()
            
            if any(word in text_lower for word in ['click', 'link', 'bit.ly', 'tiny.url', 'www.']):
                red_flags.append("Contains suspicious links")
            
            if any(word in text_lower for word in ['otp', 'pin', 'cvv', 'password']):
                red_flags.append("Asks for sensitive credentials")
            
            if any(word in text_lower for word in ['urgent', 'immediately', 'within', 'hours', 'blocked']):
                red_flags.append("Uses urgency tactics")
            
            if any(word in text_lower for word in ['won', 'winner', 'prize', 'lottery', 'congratulations', 'lakh']):
                red_flags.append("Promises unrealistic rewards")
            
            if any(word in text_lower for word in ['verify', 'update', 'confirm', 'validate']):
                red_flags.append("Requests verification/update")
            
            if red_flags:
                red_flag_text = "\n\n🚩 Red Flags Detected:\n" + "\n".join([f"  • {flag}" for flag in red_flags])
            else:
                red_flag_text = ""
            
            return f"{base_explanation}\n\n{confidence_text}{red_flag_text}"
        
        return f"{base_explanation}\n\n{confidence_text}"
    
    def analyze_message(self, image):
        """Complete analysis pipeline: OCR -> Extract -> Predict"""
        # Extract text
        extracted_text = self.extract_text(image)
        
        # Extract transaction details
        transaction_details = self.extract_transaction_details(extracted_text)
        
        # Predict fraud
        prediction_result = self.predict_fraud(extracted_text)
        
        # Make sure these lines are indented with the SAME spaces/tabs
        print("=" * 50)
        print("EXTRACTED TEXT:", extracted_text)
        print("TRANSACTION DETAILS:", transaction_details)
        print("PREDICTION RESULT:", prediction_result)
        print("=" * 50)
        
        return {
            'extracted_text': extracted_text,
            'transaction_details': transaction_details,
            'fraud_analysis': prediction_result
        }

def format_amount(amount):
    """Format amount in Indian currency style"""
    if amount is None:
        return "Not detected"
    
    amount_str = f"{amount:,.2f}"
    # Indian number format (lakhs, crores)
    if amount >= 10000000:  # 1 crore
        return f"₹{amount/10000000:.2f} Cr"
    elif amount >= 100000:  # 1 lakh
        return f"₹{amount/100000:.2f} L"
    else:
        return f"₹{amount_str}"

if __name__ == "__main__":
    print("Pipeline module loaded successfully")
    print("Import this module in app.py to use the fraud detection pipeline")