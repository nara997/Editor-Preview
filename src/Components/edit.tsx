
import { useForm, Controller } from 'react-hook-form';


interface IData {
    filterData: [{
        id: string,
        subject: string,
        body: string
    }],
    setOpen: boolean,
}

// const data: IData = {
//     ID: "24567",
//     Subject: "Quantum Mechanics Exploration",
//     Body: "Greetings explorers! In our quest to unravel the mysteries of the quantum realm, let's delve into the mind-bending world of superposition and entanglement. Buckle up for a journey where particles can exist in multiple states simultaneously, and actions on one can instantaneously affect another, regardless of distance. Share your thoughts and theories as we navigate this perplexing yet fascinating domain",
// };


export const Editor = ({ filterData, setOpen }: IData) => {


    const { handleSubmit, control } = useForm();


    const onSubmit = (formData: IData) => {


        console.log('Form data:', formData);
    };

    const cancelButton = () => {
        setOpen(false)
    }

    return (
        <div className='p-9' >
         

            <h1 className='text-center font-semibold text-2xl '>Khoros data editer</h1>
        <div className='justify-start flex p-2 mb-2' onClick={cancelButton}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /> 
            </svg>
            <p className='pl-2'>Home</p>
        </div>
            <div className="container mx-auto max-w-7xl px-4 min-h-screen justify-around grid h-full gap-14 grid-flow-col grid-cols-2">
                
                {filterData.map((items) => (
                    <>

                        <div key={items.id} className='border border-slate-300 p-6 rounded-md shadow-md min-h-96 overscroll-contain overflow-auto h-48'>
                            <div className='mb-4'>
                                <h1 className='text-md font-semibold'>Subject:</h1>
                                <p className='text-gray-700 text-sm font-normal' >{items.subject}</p>
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='text-md font-semibold'>Body:</h1>
                                <p className='text-gray-700 flex-grow break-all text-sm font-normal'>{items.body}</p>
                            </div>
                        </div>
                        {/* Editable Preview */}
                        <div className='w-full  '>
                            <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-4 rounded-md shadow-md'>
                                <div className='mb-4'>
                                    <label htmlFor="subject" className='block text-md font-semibold text-gray-600'>Subject:</label>
                                    <Controller
                                        name="subject"
                                        control={control}
                                        defaultValue={items.subject}
                                        render={({ field }) => (
                                            <input
                                                onChange={(e) => field.onChange(e.target.value)}
                                                value={field.value}
                                                type="text"
                                                className='w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500 font-normal'
                                                placeholder="Enter subject"
                                            />
                                        )}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="body" className='block text-md font-semibold text-gray-600'>Body:</label>
                                    <Controller
                                        name="body"
                                        control={control}
                                        defaultValue={items.body}
                                        render={({ field }) => (
                                            <textarea
                                                onChange={(e) => field.onChange(e.target.value)}
                                                value={field.value}
                                                className='w-full min-h-52 px-3 py-2 text-sm font-normal border border-slate-300 rounded-md focus:outline-none focus:border-blue-500'
                                                placeholder="Enter body"
                                            />
                                        )}
                                    />
                                </div>
                                <div className='space-x-4'>

                                    <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
                                        update
                                    </button>
                                    <button type="submit" onClick={cancelButton} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

// export default Editor;