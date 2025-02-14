from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    """Parolni xesh qilish"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    """Foydalanuvchi kiritgan parolni bazadagi xesh bilan solishtirish"""
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password):
    return pwd_context.hash(password)