from langchain_chroma import Chroma
from rag.embeddings import get_embeddings

DB_PATH = "chroma_db"

def create_vector_db(chunks):

    embeddings = get_embeddings()

    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=DB_PATH
    )

    vectordb.persist()

    return vectordb


def load_vector_db():

    embeddings = get_embeddings()

    vectordb = Chroma(
        persist_directory=DB_PATH,
        embedding_function=embeddings
    )

    return vectordb