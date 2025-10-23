# Transaction Fraud Detection System 🛡️

A machine learning-powered system to detect fraudulent transaction messages from screenshots using OCR and Natural Language Processing.

## 🎯 Project Aim

This system analyzes transaction messages (like GPay, PhonePe, bank SMS) to detect:
- **Legitimate transactions**: Deposits, transfers, payments
- **Fraudulent messages**: Phishing, OTP requests, fake KYC, lottery scams, account threats, fake delivery charges, tax refund scams

```

## 🚀 Features

- **Image Text Extraction**: OCR using Tesseract and EasyOCR
- **Transaction Detection**: Identifies amount, transaction type, and recipient
- **Fraud Classification**: Multi-class fraud detection with confidence scores
- **Beautiful UI**: Blue-themed Streamlit interface
- **Real-time Analysis**: Instant predictions with detailed explanations

## 📋 Prerequisites

- Python 3.8+
- Tesseract OCR installed on system




 **Install dependencies:**
``bash
pip install -r requirements.txt
```

 **Train the model:**
```bash
python train_model.py
```

 **Run the application:**
```bash
streamlit run app.py
```

## 🎮 Usage

1. Open the application in your browser (usually http://localhost:8501)
2. Upload a screenshot of a transaction message
3. Click "Analyze Transaction" button
4. View the results:
   - Transaction type and amount
   - Fraud prediction with confidence
   - Detailed explanation

## 🧠 Model Details

- **Algorithm**: Random Forest Classifier
- **Features**: TF-IDF vectorization of text
- **Classes**: 8 fraud types + legitimate transactions
- **Accuracy**: ~95% on test data

### Fraud Categories Detected:
1. Legitimate Transaction
2. Phishing Attempt
3. OTP/PIN/CVV Request
4. Fake KYC Update
5. Lottery/Prize Scam
6. Account Blocking Threat
7. Fake Delivery Charges
8. Tax Refund Scam

## 🔧 Technical Stack

- **Frontend**: Streamlit
- **ML**: Scikit-learn (Random Forest)
- **OCR**: Pytesseract + EasyOCR
- **NLP**: TF-IDF Vectorization
- **Data**: Pandas, NumPy

## 📊 Dataset

The system is trained on 1600+ synthetic transaction messages covering:
- Real transaction formats (UPI, NEFT, IMPS)
- Common fraud patterns
- Multiple banks and payment platforms
