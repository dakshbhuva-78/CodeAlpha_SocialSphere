import { Trash2, X } from "lucide-react";

const DeletePostModal = ({ close, onDelete }) => {

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white dark:bg-gray-900 rounded-3xl w-[420px] shadow-2xl overflow-hidden">

                <div className="flex justify-between items-center px-6 py-5 border-b dark:border-gray-700">

                    <h2 className="text-2xl font-bold">
                        Delete Post
                    </h2>

                    <button onClick={close}>
                        <X />
                    </button>

                </div>

                <div className="p-8 text-center">

                    <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex justify-center items-center">

                        <Trash2
                            className="text-red-600"
                            size={40}
                        />

                    </div>

                    <h3 className="text-xl font-bold mt-6">

                        Delete this post?

                    </h3>

                    <p className="text-gray-500 mt-3">

                        This action cannot be undone.

                    </p>

                </div>

                <div className="flex gap-3 p-6">

                    <button
                        onClick={close}
                        className="flex-1 py-3 rounded-xl border"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeletePostModal;