import { NextPage } from "next/types";
import Header from "../../components/Header";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight } from "@uiw/codemirror-theme-github";
import { initializeApp, getApps } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { firebaseConfig } from "../../firebase";
import { FirebaseStorage } from "@firebase/storage";
import { getStorage, ref,getBytes } from "firebase/storage";

interface codeProps {
  code: string;
}

const Read: NextPage<codeProps> = ({ code }: codeProps) => {
  console.log(code);
  return (
    <div>
      <Header />
      <main
        className="bg-[#f6f8fa] border 
          max-w-4xl mx-auto mt-4 rounded-md flex items-center 
          justify-center"
      >
        <div className="flex flex-col border-2 border-gray-100 rounded-md border-solid max-w-4xl mx-auto">
          <CodeMirror
            className="w-full bg-gray-800"
            value={code}
            height="384px"
            theme={githubLight}
            width="894px"
            extensions={[javascript({ jsx: true })]}
          />
        </div>
      </main>
    </div>
  );
};

export default Read;

export const getServerSideProps = async (context: any) => {
  const { email, id } = context.params;
  const app = () =>
    !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app());
  const colref = collection(db, "userdocs");
  const docref = doc(db, "userdocs/users", email ?? "loggedinuser", id);
  console.log(docref.path);
  var codedocument: any = {};
  const docSnap = await getDoc(docref);
  if (docSnap.exists()) {
    codedocument = docSnap.data();
    console.log("Document data:", docSnap.data().fileUrl);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  const storage: FirebaseStorage = getStorage(app());

  const httpsReference = ref(
    storage,
    codedocument.fileUrl ??
      "https://firebasestorage.googleapis.com/v0/b/react-codemirror.appspot.com/o/loggedinuser.js?alt=media&token=f9f8f8f8-f9f8-f9f8-f9f8-f9f8f8f8f8f8"
  );
  const blob = await getBytes(httpsReference);
  const text = Buffer.from(blob).toString("utf8");
  
  return {
    props: {
      code: text
    },
  };
};



