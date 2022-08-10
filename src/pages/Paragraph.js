import React from 'react';
import Header from '../components/Header';
import { Editor as ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { MdDeleteForever } from 'react-icons/md';
// import { BiEdit } from 'react-icons/bi';
// import EditTaskPopup from '../components/EditTaskPopup';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ImSpinner7 } from 'react-icons/im';
// import { toast } from 'react-toastify';
// import axios from '../utils/axios';

const Paragraph = () => {
  const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote'
    ]
  };
  //   const editedTask = useRef();
  //   const [tasks, setTasks] = useState([]);
  //   const [loading, setLoading] = useState('idle');
  //   const [showModel, setShowModel] = useState(false);

  //   useEffect(() => {
  //     setLoading('loading');
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/api/getTask`)
  //       .then((jsonRes) => {
  //         setTasks(jsonRes.data.tasks);
  //         setLoading('loaded');
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }, []);

  //   async function sendClickHandler(e) {
  //     const btn = e.currentTarget;
  //     if (btn.disabled) {
  //       return;
  //     }
  //     btn.disabled = true;
  //     try {
  //       await addTask();
  //       btn.disabled = false;
  //     } catch (error) {
  //       btn.disabled = false;
  //       console.log(error);
  //     }
  //   }

  //   async function ctrlEnterHandler(e) {
  //     if (e.ctrlKey && e.code === 'Enter') {
  //       try {
  //         await addTask();
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }

  //   const addTask = () => {
  //     const body = inputTask.current.innerText;
  //     if (body.trim() === '') {
  //       toast.error('Task field is required!', {
  //         theme: 'dark',
  //         position: 'bottom-right',
  //         autoClose: 5000
  //       });
  //       return;
  //     }
  //     axios
  //       .post(`${process.env.REACT_APP_API_URL}/api/addTask`, { task: body })
  //       .then((jsonRes) => {
  //         setTasks((prev) => {
  //           return [jsonRes.data.new_task, ...prev];
  //         });
  //         inputTask.current.innerText = '';
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   };

  //   const deleteTask = async (id) => {
  //     try {
  //       await axios.delete(`${process.env.REACT_APP_API_URL}/api/deleteTask/${id}`);
  //       setTasks((prev) => {
  //         return prev.filter((obj) => {
  //           return obj._id !== id;
  //         });
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex mx-10 md:flex-row xs:flex-col gap-3 items-center justify-center mt-10">
        <CKEditor
          config={editorConfiguration}
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />

        <button className="py-[11px] px-5 flex bg-brand-4 w-fit text-sm text-white font-poppins rounded-lg">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Paragraph;
