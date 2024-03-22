import { useEffect, useState } from "react";
import { Editor, IfilterData } from "./edit";
import { DataTable } from "../Components/ui/Table/data-table";
import { ColumnDef } from "@tanstack/react-table";

export const Home = () => {
  const [data, setData] = useState<IfilterData[]>([]);
  const [filterData, setFilterData] = useState<IfilterData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://italent2.demo.lithium.com/api/2.0/search?q=SELECT id,body, subject, author.login, post_time FROM messages where depth=0"
        );
        const jsonData = await response.json();
        setData(jsonData.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const buttonhandle = (id: string) => {
    const filtered =  data.filter((item) => item.id === id);
    const subfilter = data.filter((item) => item.subject.startsWith("Re:"));
    setErr(subfilter.length !== 0);
    setOpen(true);
    setFilterData(filtered);
  };

  const columns: ColumnDef<IfilterData>[] = [
    {
      accessorKey: "id",
      header: "Message Id",
    },
    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      accessorKey: "author.login",
      header: "Author",
    },
    {
      accessorKey: "post_time",
      header: "Post Time",
    },
    {
      accessorKey: "buttonColumn",
      header: "Actions", // Customize the header label for the button column
      cell: ({ row }) => (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => buttonhandle(row.original.id)}
        >
          Moderate
        </button>
      ),
    },
  ];

  return (
    <div className="main-dev container max-2xl mx-auto">
      <div className="">
        <img
          src="https://www.italentdigital.com/wp-content/uploads/2022/08/italent-logo-black.svg"
          alt="italent-logo"
        />
      </div>
      {!open && (
        <div className="min-w-36">
          <h1 className="text-center p-6 font-semibold text-2xl font-serif">
            Message Moderator
          </h1>
          <DataTable columns={columns} data={data} />
        </div>
      )}
      {open && (
        <div>
          <Editor filterData={filterData} setOpen={setOpen} err={err} />
        </div>
      )}
    </div>
  );
};
