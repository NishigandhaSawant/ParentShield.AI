"""
Test script for link fraud detection functionality
"""

import re
import requests
from urllib.parse import urlparse

def extract_urls(text):
    """Extract URLs from text"""
    url_pattern = r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
    urls = re.findall(url_pattern, text)
    
    # Also find URLs without protocol
    domain_pattern = r'(?<!\w)(?:www\.)?[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+(?:/[^\s]*)?'
    domains = re.findall(domain_pattern, text)
    
    # Combine and deduplicate
    all_urls = list(set(urls + domains))
    return all_urls

def analyze_links(urls):
    """Analyze URLs for potential fraud/safety issues"""
    if not urls:
        return None
    
    link_results = []
    
    for url in urls:
        # Ensure URL has protocol
        if not url.startswith(('http://', 'https://')):
            url = 'http://' + url
        
        analysis = {
            "url": url,
            "is_suspicious": False,
            "issues": [],
            "safety_score": 1.0
        }
        
        # Parse URL
        try:
            parsed = urlparse(url)
            domain = parsed.netloc.lower()
            
            # Check for suspicious domain patterns
            suspicious_patterns = [
                r'tiny\.url', r'bit\.ly', r't\.co', r'goo\.gl',
                r'shorturl', r'url\.short', r'link\.short',
                r'[0-9]{5,}',  # Many numbers in domain
                r'[a-z]{15,}\.[a-z]{2,}'  # Very long random domains
            ]
            
            for pattern in suspicious_patterns:
                if re.search(pattern, domain):
                    analysis["is_suspicious"] = True
                    analysis["issues"].append(f"Suspicious domain pattern: {pattern}")
                    analysis["safety_score"] *= 0.5
            
            # Check for known banking domains (legitimate)
            legitimate_banks = [
                'bankofamerica.com', 'chase.com', 'wellsfargo.com',
                'citibank.com', 'hsbc.com', 'icicibank.com',
                'hdfcbank.com', 'axisbank.com', 'sbi.co.in'
            ]
            
            is_legitimate_bank = any(bank in domain for bank in legitimate_banks)
            
            if not is_legitimate_bank:
                # Check for banking-related keywords in suspicious domains
                banking_keywords = ['bank', 'secure', 'login', 'account', 'verify']
                if any(keyword in domain for keyword in banking_keywords):
                    analysis["is_suspicious"] = True
                    analysis["issues"].append("Banking-related domain that isn't a known bank")
                    analysis["safety_score"] *= 0.3
            
            # Try to check if URL is accessible (basic check)
            try:
                response = requests.head(url, timeout=5, allow_redirects=True)
                if response.status_code >= 400:
                    analysis["issues"].append(f"URL returns error status: {response.status_code}")
                    analysis["safety_score"] *= 0.7
            except requests.exceptions.RequestException:
                analysis["issues"].append("URL is not accessible")
                analysis["safety_score"] *= 0.8
                
        except Exception as e:
            analysis["issues"].append(f"Parsing error: {str(e)}")
            analysis["safety_score"] *= 0.9
        
        link_results.append(analysis)
    
    # Overall assessment
    suspicious_count = sum(1 for link in link_results if link["is_suspicious"])
    if suspicious_count > 0:
        overall_assessment = {
            "total_links": len(link_results),
            "suspicious_links": suspicious_count,
            "is_suspicious": True,
            "risk_level": "high" if suspicious_count/len(link_results) > 0.5 else "medium"
        }
    else:
        overall_assessment = {
            "total_links": len(link_results),
            "suspicious_links": 0,
            "is_suspicious": False,
            "risk_level": "low"
        }
    
    return {
        "links": link_results,
        "overall": overall_assessment
    }

# Test the functions
if __name__ == "__main__":
    # Test text with various URLs
    test_text = """
    Click here to claim your prize: http://bit.ly/suspicious-link
    Visit our secure bank website: https://secure-bank-login.com
    Official Chase website: https://chase.com
    Another link: www.example.com/path?param=value
    Suspicious banking site: http://fake-bank-verification.com
    """
    
    print("Test text:")
    print(test_text)
    print("\n" + "="*50)
    
    # Extract URLs
    urls = extract_urls(test_text)
    print(f"Extracted URLs: {urls}")
    
    # Analyze links
    link_analysis = analyze_links(urls)
    print(f"\nLink analysis: {link_analysis}")