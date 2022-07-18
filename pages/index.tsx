import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Login from "../components/Login";
import Header from "../components/Header";
import { CodeIcon } from "@heroicons/react/solid";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useState } from "react";
import { storage, firebaseConfig } from "../firebase";
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import { initializeApp, getApps, getApp } from "firebase/app";
import { collection, doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [code, setCode] = useState('');
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const onCreate = async (e: any) =>  {
    e.preventDefault();
    const app = () =>
      !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    const storage: FirebaseStorage = getStorage(app());
    const storageRef = ref(storage, `${session?.user?.email?.split("@")[0]}.js`);
    var result = await uploadString(storageRef, code);
    var url = await getDownloadURL(result.ref);
    var id = nanoid();
    const db = getFirestore(app());
    const colref = collection(db, "userdocs");
    const docref = doc(
      db,
      "userdocs/users",
      session?.user?.email?.split("@")[0] ?? "loggedinuser",
      id
    );
    await setDoc(docref, {
      fileUrl: url,
      description: description,
      name: name,
      createdOn: serverTimestamp(),
    });
    console.log(`${session?.user?.email?.split("@")[0]}`);
    router.push(`/${session?.user?.email?.split("@")[0]}/${id}`);
  };

  if (session) {
    return (
      <div>
        <Header />
        <main>
          <div className="bg-gray-100 border">
            <ul className="flex items-center max-w-4xl mx-auto space-x-6 py-3">
              <li className="flex mr-6">
                <CodeIcon className="w-10 h-5 border my-1 " />
                <a>
                  <span className="text-blue-700 text-sm font-medium cursor-pointer px-2">
                    Facetedsearch.cs
                  </span>
                  <span className="block text-xs text-gray-500 hover:underline px-2">
                    No description
                  </span>
                </a>
              </li>

              <li className="flex">
                <CodeIcon className="w-10 h-5 border my-1" />
                <a>
                  <span className="text-blue-700 text-sm font-medium cursor-pointer px-2">
                    Searchbyfirstname.cs
                  </span>
                  <span className="block text-xs text-gray-500 hover:underline px-2">
                    No description
                  </span>
                </a>
              </li>

              <li className="flex">
                <CodeIcon className="w-10 h-5 border my-1" />
                <a>
                  <span className="text-blue-700 text-sm font-medium cursor-pointer px-2">
                    startup.cs
                  </span>
                  <span className="block text-xs text-gray-500 hover:underline px-2">
                    No description
                  </span>
                </a>
              </li>

              <li className="flex">
                <CodeIcon className="w-10 h-5 border my-1" />
                <a>
                  <span className="text-blue-700 text-sm font-medium cursor-pointer px-2">
                    startup1.cs
                  </span>
                  <span className="block text-xs text-gray-500 hover:underline px-2">
                    No description
                  </span>
                </a>
              </li>

              <li className="flex">
                <a className="px-3">
                  <span className="text-blue-700 text-sm font-medium cursor-pointer">
                    View all Gists
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div
            className="bg-[#f6f8fa] border 
          max-w-4xl mx-auto mt-4 rounded-md flex items-center 
          justify-center"
          >
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-100 w-full font-thin p-2  border-gray-700
              text-white text-sm rounded-md mr-4 focus:outline-none focus:text-black focus:bg-white"
              placeholder="Gist description"
            />
          </div>
          <div className="flex mt-4 flex-col border-2 border-gray-100 rounded-md border-solid max-w-4xl mx-auto">
            <div className=" bg-[#f6f8fa]">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white w-64 my-2 mx-2 p-1.5 font-thin border
              text-white text-sm rounded-lg mr-4 focus:outline-none focus:text-black focus:bg-white"
                placeholder="Filename including extension"
              />
            </div>
            <div className="bg-[#f6f8fa]">
              <CodeMirror
                className="w-full bg-gray-800"
                value={code}
                onChange={(value) => setCode(value)}
                height="384px"
                theme={githubLight}
                width="100%"
                extensions={[javascript({ jsx: true })]}
              />
            </div>
          </div>
          <div className="flex justify-between max-w-4xl mx-auto my-4">
            <div>
              <button className=" bg-gray-100 hover:bg-gray-300 border border-gray-400 text-black font-semibold text-sm py-2 px-4 rounded-md">
                Add File
              </button>
            </div>
            <div>
              <button
                onClick={(e) => onCreate(e)}
                className=" bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-2 px-4 rounded-lg"
              >
                Create gist
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  return <Login />;
};

export default Home;
