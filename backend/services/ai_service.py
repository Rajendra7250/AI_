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

# Initialize the client. 
# Make sure you provide your API key before making requests!
client = genai.Client(api_key=GEMINI_API_KEY)

def generate_resume_content(user_data: dict) -> str:
    """
    Generate an ATS-friendly resume using Gemini.
    """
    prompt = f"""
    You are an expert resume writer. Generate an ATS-friendly resume based on the following data:
    {user_data}
    Provide the resume in Markdown format. Structure it with Contact Info, Summary, Experience, Education, and Skills.
    Make it professional and impactful.
    """
    
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.7,
        )
    )
    return response.text

def generate_interview_questions(role: str, experience_level: str) -> str:
    """
    Generate technical and behavioral interview questions.
    """
    prompt = f"""
    You are a senior tech interviewer. Provide 3 technical and 2 behavioral interview questions 
    for a {role} with {experience_level} experience. For each question, provide a sample ideal answer outline.
    Return the output in Markdown format.
    """
    
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.7,
        )
    )
    return response.text

def provide_interview_feedback(question: str, user_answer: str) -> str:
    """
    Provide feedback on a mock interview answer.
    """
    prompt = f"""
    You are a strict but helpful interviewer. 
    Question asked: "{question}"
    User's answer: "{user_answer}"
    
    Provide constructive feedback. Mention what was good, what was missing, and give a score out of 10.
    """
    
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.5,
        )
    )
    return response.text
