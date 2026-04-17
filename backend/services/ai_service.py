import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_path)

# =========================================================================
# ⚠️ INSERT YOUR GEMINI API KEY HERE OR IN THE .env FILE
# =========================================================================
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

# Initialize the client only if a valid API key is present
client = None
if GEMINI_API_KEY:
    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Failed to initialize Gemini client: {e}")

def generate_resume_content(user_data: dict) -> str:
    """
    Generate an ATS-friendly resume using Gemini.
    """
    if not client:
        return "# Mocked Resume\n\n- Experience: " + user_data.get("experience", "N/A") + "\n- Skills: " + user_data.get("skills", "N/A") + "\n\n(Provide a valid API key for real generation.)"
    
    prompt = f"""
    You are an expert resume writer. Generate an ATS-friendly resume based on the following data:
    {user_data}
    Provide the resume in Markdown format. Structure it with Contact Info, Summary, Experience, Education, and Skills.
    Make it professional and impactful.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
            )
        )
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return "# Mocked Resume\n\n- Experience: " + user_data.get("experience", "N/A") + "\n- Skills: " + user_data.get("skills", "N/A") + "\n\n(Note: Falling back to mocked version due to API error: invalid or missing API key.)"

def generate_interview_questions(role: str, experience_level: str) -> str:
    """
    Generate technical and behavioral interview questions.
    """
    if not client:
        return f"# Mocked Interview Questions for {role} ({experience_level})\n\n1. Technical Q1\n2. Technical Q2\n3. Technical Q3\n4. Behavioral Q1\n5. Behavioral Q2\n\n(Provide a valid API key for real generation.)"
        
    prompt = f"""
    You are a senior tech interviewer. Provide 3 technical and 2 behavioral interview questions 
    for a {role} with {experience_level} experience. For each question, provide a sample ideal answer outline.
    Return the output in Markdown format.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
            )
        )
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return f"# Mocked Interview Questions for {role} ({experience_level})\n\n1. Technical Q1\n2. Technical Q2\n3. Technical Q3\n4. Behavioral Q1\n5. Behavioral Q2\n\n(Note: Falling back to mocked version due to API error: invalid or missing API key.)"

def provide_interview_feedback(question: str, user_answer: str) -> str:
    """
    Provide feedback on a mock interview answer.
    """
    if not client:
        return f"# Mocked Feedback\n\nQuestion: {question}\nYour Answer: {user_answer}\n\nFeedback: Good attempt. Score: 7/10. (Provide a valid API key for real generation.)"
        
    prompt = f"""
    You are a strict but helpful interviewer. 
    Question asked: "{question}"
    User's answer: "{user_answer}"
    
    Provide constructive feedback. Mention what was good, what was missing, and give a score out of 10.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.5,
            )
        )
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return f"# Mocked Feedback\n\nQuestion: {question}\nYour Answer: {user_answer}\n\nFeedback: Good attempt. Score: 7/10. (Note: Falling back to mocked version due to API error: invalid or missing API key.)"

