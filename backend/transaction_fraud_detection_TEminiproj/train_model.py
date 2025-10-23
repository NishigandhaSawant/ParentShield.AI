"""
Transaction Fraud Detection Model Training
Trains a Random Forest classifier on transaction messages
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import joblib
import os
import re

# Create necessary directories
os.makedirs('models', exist_ok=True)
os.makedirs('data', exist_ok=True)

def generate_training_data():
    """Generate comprehensive training dataset for fraud detection"""
    
    # Legitimate transactions
    legitimate = [
        "Rs.500 debited from account XX1234 on 15-Jan-24. UPI/GPAY/9876543210. Available balance: Rs.5000",
        "Rs.1000 credited to account XX5678 on 20-Jan-24. NEFT from JOHN DOE. Balance: Rs.15000",
        "You have successfully paid Rs.250 to ABC Store via UPI. Txn ID: 402345678901",
        "Rs.2500 transferred to 9876543210 via PhonePe. UPI Ref: 401234567890",
        "Your account XX9012 has been credited with Rs.5000 on 22-Jan-24. IMPS from JANE SMITH",
        "Payment of Rs.799 to Amazon Pay successful. Order ID: 123-4567890-1234567",
        "Rs.150 debited for Swiggy order. Txn successful. Balance: Rs.8500",
        "Salary credited: Rs.45000 in account XX3456 on 01-Feb-24. From: XYZ COMPANY LTD",
        "Rs.300 paid to Uber via UPI. Trip ID: AB1234CD5678. Payment successful",
        "Received Rs.2000 from 8765432109. UPI Ref: 403456789012. Balance: Rs.12000",
        "Rs.1200 debited for electricity bill payment. Transaction successful",
        "Cashback of Rs.50 credited to your Paytm wallet. Total balance: Rs.550",
        "Rs.5000 withdrawn from ATM at MG Road on 18-Jan-24. Available balance: Rs.20000",
        "Rs.899 paid to Zomato. Order #987654. Payment via UPI successful",
        "Rent payment of Rs.15000 to landlord successful via NEFT. Ref: N12345678",
        "Rs.3500 refund credited for cancelled order. Amazon Refund ID: RF123456",
        "Insurance premium of Rs.2400 paid successfully. Policy: LIC/12345678",
        "Rs.750 debited for mobile recharge. Number: 9876543210. Balance: Rs.9250",
        "Credit card bill of Rs.8500 paid. Card XX1234. Due cleared",
        "Rs.200 donated to charity via UPI. Txn ID: 404567890123. Thank you!",
    ]
    
    # Phishing attempts
    phishing = [
        "URGENT: Your bank account will be blocked. Click here immediately: bit.ly/fake123 to verify",
        "Congratulations! You've won Rs.5 Lakhs. Claim now at www.fakesite.com/claim with your details",
        "Your KYC is pending. Update now at www.updatekyc-fake.com or account will be suspended",
        "Dear customer, unusual activity detected. Verify your account: tiny.url/scam123",
        "Action Required! Your account has been compromised. Click to secure: fakbank.com/secure",
        "Limited time offer! Get Rs.10000 cashback. Register at www.freemoney.fake.com",
        "Your PAN card is not linked. Click here to link immediately or face penalty",
        "Confirm your mobile number by clicking this link: bit.ly/confirm-fake or service will stop",
        "You have unclaimed tax refund of Rs.25000. Apply at www.taxrefund-fake.in",
        "Dear user, your account shows suspicious activity. Verify at www.verify-account.fake",
        "ALERT: Someone is trying to access your account. Secure it now: securebank.fake",
        "Your credit card is expired. Update details at www.updatecard.fake.com immediately",
        "Claim your insurance bonus of Rs.50000 at www.insurance-bonus.fake within 24 hours",
        "Your electricity bill payment failed. Retry at www.billpay.fake.com with card details",
        "Government subsidy of Rs.15000 available for you. Apply: www.subsidy-fake.gov.in",
    ]
    
    # OTP/PIN/CVV requests
    otp_requests = [
        "Dear customer, share OTP 123456 to complete your transaction. Valid for 10 minutes",
        "Your verification code is 987654. Please share this to verify your identity",
        "Enter your ATM PIN and OTP to receive cashback of Rs.500 in your account",
        "To unblock your account, reply with your CVV number and card expiry date",
        "Confirm transaction by sharing 6-digit OTP sent to your mobile: XXXXXX",
        "Update KYC by providing your card CVV and OTP. Call 1800-XXX-FAKE",
        "Share your internet banking password and OTP to activate new features",
        "Verification needed: Send your ATM PIN and OTP to 9999988888",
        "Your account verification requires CVV, PIN and OTP. Share immediately",
        "To reverse unauthorized transaction, provide your debit card PIN and OTP",
        "Customer care calling: Please share OTP to help you with refund process",
        "Confirm your identity by replying with OTP, CVV and card number",
        "Account locked! Share OTP and PIN to unlock within 1 hour",
        "Prize delivery requires verification. Send OTP and CVV to claim",
        "Update Aadhaar link by providing OTP, PIN and CVV via SMS",
    ]
    
    # Fake KYC updates
    fake_kyc = [
        "Your KYC verification is incomplete. Update at www.kyc-update.fake within 24 hours",
        "Dear customer, KYC documents expired. Re-submit PAN, Aadhaar at www.ekyc.fake",
        "Action required: Complete video KYC at www.vkyc-fake.com or account will be frozen",
        "Your bank KYC is not updated as per RBI guidelines. Update now: www.rbikyc.fake",
        "E-KYC mandatory from tomorrow. Submit documents at www.mandate-kyc.fake",
        "Account suspension in 48 hours due to pending KYC. Update at www.urgent-kyc.fake",
        "New KYC norms: Upload selfie with PAN and Aadhaar at www.newkyc.fake",
        "Your account is temporarily blocked. Complete KYC at www.unblock-kyc.fake",
        "RBI regulation: Update KYC or face Rs.10000 penalty. Visit www.penalty-kyc.fake",
        "Dear valued customer, KYC update pending. Click www.customer-kyc.fake to continue services",
    ]
    
    # Lottery/Prize scams
    lottery_scams = [
        "Congratulations! You won Rs.25 Lakh in lucky draw. Claim at www.lottery-win.fake",
        "You are selected winner of iPhone 15 Pro! Pay Rs.500 delivery fee to claim",
        "LUCKY WINNER ALERT! Rs.10 Lakhs prize. Send Rs.2000 processing fee to claim",
        "You won Rs.5 Crore in KBC lottery! Contact immediately with your bank details",
        "Congratulations! Rs.50000 Amazon gift voucher won. Claim with card details",
        "You are our 1 millionth visitor! Claim Rs.1 Lakh reward at www.visitor-prize.fake",
        "Dear winner, you won luxury car! Pay Rs.5000 registration fee to claim",
        "Google anniversary winner! Rs.15 Lakh prize. Verify identity with OTP and CVV",
        "Lucky draw: You won Rs.7 Lakh. Transfer Rs.3000 tax to receive prize money",
        "Congratulations! WhatsApp lottery winner Rs.20 Lakh. Click www.whatsapp-lottery.fake",
    ]
    
    # Account blocking threats
    blocking_threats = [
        "URGENT: Your account will be blocked in 2 hours. Verify now: www.verify-urgent.fake",
        "Immediate action required! Account suspension in 24 hours. Update at www.save-account.fake",
        "Dear customer, non-compliance detected. Account blocked. Unblock: www.unblock-now.fake",
        "Your account activity is suspicious. Will be frozen tomorrow. Verify: www.freeze-stop.fake",
        "ALERT: Account will be permanently closed in 6 hours. Prevent: www.account-close.fake",
        "Unusual activity detected. Account locked for security. Unlock: www.security-unlock.fake",
        "Your bank account will be deactivated due to pending verification. Act now!",
        "Final warning! Account blockage in 1 hour. Immediate verification required",
        "Service discontinued due to policy violation. Restore at www.restore-service.fake",
        "Your account is marked for closure. Prevent by verifying at www.prevent-closure.fake",
    ]
    
    # Fake delivery charges
    delivery_scams = [
        "Your parcel is held at customs. Pay Rs.500 clearance fee: www.customs-pay.fake",
        "Delivery pending! Pay Rs.200 charges to receive your Amazon package",
        "Courier notification: Pay Rs.150 redelivery fee at www.courier-fake.com",
        "Your package delivery failed. Pay Rs.300 at www.delivery-retry.fake to reschedule",
        "DTDC Alert: Parcel stuck. Clear Rs.250 fee at www.dtdc-fake.com for delivery",
        "Blue Dart: Delivery charges Rs.180 pending. Pay at www.bluedart-fake.in",
        "Your Flipkart order delivery requires Rs.99 fee. Pay now: www.flipkart-delivery.fake",
        "International parcel held. Clear customs duty Rs.800 at www.intl-customs.fake",
        "Dear customer, pay Rs.120 delivery fee for pending parcel. COD not available",
        "Package undeliverable. Pay storage charges Rs.500 at www.warehouse-fake.com",
    ]
    
    # Tax refund scams
    tax_scams = [
        "You are eligible for income tax refund of Rs.35000. Claim at www.incometax-refund.fake",
        "Dear taxpayer, refund of Rs.12000 approved. Verify bank details at www.tax-refund.fake",
        "ITR refund Rs.25000 pending. Process at www.itr-process.fake with PAN details",
        "GST refund Rs.8000 available. Claim at www.gst-refund-fake.com within 7 days",
        "Tax rebate of Rs.18000 approved. Update bank account at www.rebate-claim.fake",
        "You have unclaimed tax refund Rs.30000. Apply: www.unclaimed-tax.fake with Aadhaar",
        "Income tax department: Refund Rs.22000 ready. Verify at www.it-dept.fake.gov.in",
        "Your TDS refund of Rs.15000 is pending. Claim: www.tds-refund.fake",
        "Tax refund Rs.40000 approved by finance ministry. Process at www.finmin-fake.gov",
        "Dear assessee, expedite refund Rs.20000 by paying Rs.500 processing fee",
    ]
    
    # Create comprehensive dataset
    data = {
        'message': (
            legitimate * 20 + phishing * 20 + otp_requests * 20 + 
            fake_kyc * 20 + lottery_scams * 20 + blocking_threats * 20 + 
            delivery_scams * 20 + tax_scams * 20
        ),
        'label': (
            ['legitimate'] * (len(legitimate) * 20) +
            ['phishing'] * (len(phishing) * 20) +
            ['otp_request'] * (len(otp_requests) * 20) +
            ['fake_kyc'] * (len(fake_kyc) * 20) +
            ['lottery_scam'] * (len(lottery_scams) * 20) +
            ['blocking_threat'] * (len(blocking_threats) * 20) +
            ['delivery_scam'] * (len(delivery_scams) * 20) +
            ['tax_scam'] * (len(tax_scams) * 20)
        )
    }
    
    df = pd.DataFrame(data)
    
    # Shuffle the dataset
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    return df

def preprocess_text(text):
    """Basic text preprocessing"""
    # Convert to lowercase
    text = text.lower()
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def train_fraud_detector():
    """Train the fraud detection model"""
    
    print("🔄 Generating training data...")
    df = generate_training_data()
    
    # Save dataset
    df.to_csv('data/transaction_data.csv', index=False)
    print(f"✅ Dataset created: {len(df)} samples")
    print(f"   Classes: {df['label'].value_counts().to_dict()}")
    
    # Preprocess messages
    print("\n🔄 Preprocessing text...")
    df['processed_message'] = df['message'].apply(preprocess_text)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        df['processed_message'], 
        df['label'], 
        test_size=0.2, 
        random_state=42,
        stratify=df['label']
    )
    
    print(f"✅ Train set: {len(X_train)} samples")
    print(f"   Test set: {len(X_test)} samples")
    
    # Vectorization
    print("\n🔄 Creating TF-IDF features...")
    vectorizer = TfidfVectorizer(
        max_features=3000,
        ngram_range=(1, 3),
        min_df=2,
        max_df=0.8
    )
    
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
    print(f"✅ Feature vector shape: {X_train_vec.shape}")
    
    # Label encoding
    label_encoder = LabelEncoder()
    y_train_encoded = label_encoder.fit_transform(y_train)
    y_test_encoded = label_encoder.transform(y_test)
    
    # Train Random Forest Classifier
    print("\n🔄 Training Random Forest Classifier...")
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=20,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1,
        class_weight='balanced'
    )
    
    model.fit(X_train_vec, y_train_encoded)
    print("✅ Model training complete!")
    
    # Evaluate model
    print("\n📊 Model Evaluation:")
    y_pred = model.predict(X_test_vec)
    
    accuracy = accuracy_score(y_test_encoded, y_pred)
    print(f"   Accuracy: {accuracy * 100:.2f}%")
    
    print("\n📋 Classification Report:")
    print(classification_report(
        y_test_encoded, 
        y_pred, 
        target_names=label_encoder.classes_,
        zero_division=0
    ))
    
    # Save models
    print("\n💾 Saving models...")
    joblib.dump(model, 'models/fraud_classifier.pkl')
    joblib.dump(vectorizer, 'models/vectorizer.pkl')
    joblib.dump(label_encoder, 'models/label_encoder.pkl')
    print("✅ Models saved in 'models/' directory")
    
    # Feature importance
    print("\n🔍 Top 20 Important Features:")
    feature_names = vectorizer.get_feature_names_out()
    importances = model.feature_importances_
    indices = np.argsort(importances)[-20:]
    
    for idx in indices[::-1]:
        print(f"   {feature_names[idx]}: {importances[idx]:.4f}")
    
    print("\n✅ Training complete! Models ready for deployment.")
    return model, vectorizer, label_encoder

if __name__ == "__main__":
    print("=" * 60)
    print("TRANSACTION FRAUD DETECTION - MODEL TRAINING")
    print("=" * 60)
    train_fraud_detector()
    print("\n" + "=" * 60)
    print("You can now run: streamlit run app.py")
    print("=" * 60)