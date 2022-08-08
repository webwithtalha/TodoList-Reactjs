import React, { useEffect } from 'react';
import useQuery from '../hooks/useQuery';
import axios from '../utils/axios';

const EditTaskPopup = ({ setShowModel, editedTask, setTasks }) => {
  const query = useQuery();
  const Id = query.get('id');
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/getSingleTask/${Id}`)
      .then((jsonRes) => {
        editedTask.current.innerText = jsonRes.data.tasks.task;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [Id]);

  const updateTask = () => {
    const body = editedTask.current.innerText;
    axios
      .patch(`${process.env.REACT_APP_API_URL}/api/updateTask/${Id}`, { task: body })
      .then((jsonRes) => {
        setTasks((prev) => {
          const findIndex = prev.findIndex(({ id }) => id === Id);
          const copy = [...prev];
          copy[findIndex] = jsonRes.data.task;
          return copy;
        });

        console.log(jsonRes.data);
        setShowModel(false);
        editedTask.current.innerText = '';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const updatedTask = async (id) => {
  //   try {
  //     await axios.patch(`${process.env.REACT_APP_API_URL}/api/updateTask/${id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-filter backdrop-blur-lg">
      <div className="relative lg:p-4 xl:p-4 sm:p-12 md:p-4 p-12 ">
        {/*content*/}
        <div className=" relative flex flex-col bg-neutral-800 border rounded-lg focus:outline-none mx-3 pb-5 lg:p-4 xl:p-4 md:p-4 sm:p-4  w-[624px] ">
          {/*header*/}
          <div className="flex items-center justify-between rounded-t pb-3 ">
            <span className=" text-white text-2xl font-semibold">Edit your Task</span>
            <button
              onClick={() => setShowModel(false)}
              className="ml-auto bg-transparent border-0 text-white opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
              <span className="bg-transparent text-white opacity-100 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div
            ref={editedTask}
            contentEditable={true}
            data-placeholder="Write a task..."
            className="inputPlaceHolder text-white py-[11px] px-5 max-w-[700px] flex-grow focus:outline-none focus:ring-0 font-poppins text-sm border-brand-5 border rounded-lg"></div>
          <div className="flex  w-full gap-10 pt-6   h-full justify-start items-center ">
            <button
              onClick={updateTask}
              className="bg-brand-4  rounded-lg w-full py-4 items-center font-bold text-white">
              Submit
            </button>
            <button
              onClick={() => setShowModel(false)}
              className="bg-brand-4 rounded-lg w-full py-4 items-center font-bold borderredall text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPopup;
