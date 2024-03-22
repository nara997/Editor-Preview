import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef} from 'react';
import ReactQuill from 'react-quill';

export type IfilterData = {
    id: string,
    subject: string,
    body: string
    post_time: string,
    author: {
        login: string
    }
}




interface ReactQuillRef extends ReactQuill {
    getEditor: () => any;
}

interface IData {
    filterData: IfilterData[],
    setOpen: (open: boolean) => any;
    err: boolean,
}

export const Editor = ({ filterData, setOpen, err }: IData) => {
    const quillRef = useRef<ReactQuillRef | null>(null);
    console.log("editor filter data",filterData )

   

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const htmlContent = filterData[0].body;
            quill.format('size', 'normal')
            quill.root.innerHTML = htmlContent;

        }
    }, [quillRef]);

    const { handleSubmit, control } = useForm();


    const modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['link'],
                ['clean']
            ],
        }
    }

    const cancelButton = () => {
        setOpen(false)
    }



    const onSubmit: SubmitHandler<FieldValues> = (formData) => {

        console.log('Form data:', formData);
    };


    return (
        <div>

            <div className='p-9' >
                {err === true &&
                    <div className='bg-red-400 w-auto h-10 pt-2 justify-center mx-auto text-white '>
                        <p className='text-center'>Reply can't be published without publishing the main message. Main message of this reply is <span className='text-sm font-medium underline underline-offset-1 pb-1'>1234</span> </p>
                    </div>
                }
                <div className='justify-start flex p-2' onClick={cancelButton}>
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
                                    <h1 className='text-sm font-semibold'>Subject:</h1>
                                    <p className='text-gray-700 text-xs' >{items.subject}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className='text-sm font-semibold'>Body:</h1>
                                    <p className='text-gray-700 flex-grow break-all text-xs'>{items.body}</p>
                                </div>
                            </div>
                            {/* Editable Preview */}
                            <div className='w-full'>
                                <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-4 rounded-md shadow-md'>
                                    <div className='mb-4'>
                                        <label htmlFor="subject" className='block text-sm font-semibold text-gray-600'>Subject:</label>
                                        <Controller
                                            name="subject"
                                            control={control}
                                            defaultValue={items.subject}
                                            render={({ field }) => (
                                                <input
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    value={field.value}
                                                    type="text"
                                                    className='w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:border-blue-500'
                                                    placeholder="Enter subject"
                                                />
                                            )}
                                        />
                                        {/* <div ref={quillRef} */}
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="body" className='block text-sm font-semibold text-gray-600'>Body:</label>
                                        <Controller
                                            name="body"
                                            control={control}
                                            // defaultValue=""// Set default value to empty string
                                            render={({ field }) => (
                                                <ReactQuill
                                                    ref={quillRef}
                                                    modules={modules}
                                                    className='w-full h-full px-3 py-2 text-sm font-normal border border-slate-300 rounded-md focus:outline-none focus:border-blue-500'
                                                    onChange={(content, delta, source, editor) => {
                                                        const textContent = editor.getHTML();
                                                        console.log("html content", textContent, content, delta, source)
                                                        field.onChange(textContent);
                                                    }} // Update form value with Quill data
                                                    theme="snow"
                                                    placeholder="Enter body"

                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='space-x-4'>
                                        {err !== true ? (<button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
                                            Publish
                                        </button>) : (<button disabled type="submit" className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
                                            Publish
                                        </button>)
                                        }
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
        </div>
    );
};
