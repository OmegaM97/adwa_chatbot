from langchain_chroma import Chroma

DB_PATH = "chroma_db"

def load_vector_db():
    vectordb = Chroma(
        persist_directory=DB_PATH,
        embedding_function=None
    )

    return vectordb