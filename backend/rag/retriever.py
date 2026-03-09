from rag.vectordb import load_vector_db

def get_retriever():

    vectordb = load_vector_db()

    retriever = vectordb.as_retriever(
        search_kwargs={"k": 4}
    )

    return retriever