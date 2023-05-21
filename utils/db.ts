import { doc, getDoc, setDoc, updateDoc, query, collection, where, getDocs, deleteDoc } from "firebase/firestore";
import db from "./firebase";
import { v4 as uuidv4 } from "uuid";

type Response = {
    form_id: string;
    id: string;
    answers: string[];
    wallet: string;
}

type Question = {
    form_id: string;
    id: string;
    type: string;
    question: string;
    required: boolean;
    allowMultipleSelections: boolean;
    choices: string[];
}

type PayloadProps = { // this is a form type
    owner_id: string;
    form_id: string;
    name: string;
    description: string;
}


const createNewForm = async (payload: PayloadProps) => {
    await setDoc(doc(db, "forms", payload.form_id), {
      owner_id: payload.owner_id,
      form_id: payload.form_id,
      name: payload.name,
    description: payload.description,
        responses: 0,
    whitelist: [],
    questions: []
    });
  };

  const updateForm = async (fid: string, data: object) => {
    await updateDoc(doc(db, "forms", fid), data);
  };

// get all workflows where owner_id = uid
const getFormsForUserId = async (uid: string) => {
    const q = query(collection(db, "forms"), where("owner_id", "==", uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  };
 

const getFormById = async (fid: string) => {
    const docRef = doc(db, "forms", fid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

const deleteFormById = async (fid: string) => {
    await deleteDoc(doc(db, "forms", fid));
}
// delete a question by ID. the question is stored in a separate collection
const deleteQuestionById = async (qid: string) => {
    await deleteDoc(doc(db, "questions", qid));
}

const createNewResponse = async (payload: any) => {   
    await setDoc(doc(db, "responses", payload.id), {
        form_id: payload.form_id,
        id: uuidv4(),
        answers: payload.answers,
        wallet: payload.wallet
    });
}



export { createNewForm, updateForm, getFormsForUserId, getFormById, deleteFormById, deleteQuestionById, createNewResponse }