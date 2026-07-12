const DeleteUserModal = ({ user, close, onDelete }) => {

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-[420px]">

                <h2 className="text-2xl font-bold">

                    Delete User

                </h2>

                <p className="mt-4 text-gray-500">

                    Are you sure you want to delete

                    <span className="font-semibold">

                        {" "}{user.fullName}

                    </span>

                    ?

                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button

                        onClick={close}

                        className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onDelete}

                        className="px-5 py-2 rounded-xl bg-red-600 text-white"

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteUserModal;