"use client";

import { getLawyersByCategory } from "@/app/lib/lawyers";
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Lawyer = (props: { name: string, about: string, image: string }) => {
  return (
    <div className="card lawyer">
      <Image
        loader={() => props.image}
        src={props.image}
        width={125}
        height={125}
        alt={props.name}
        className="card-image" />
      
      <h3>{props.name}</h3>

      <p>{props.about}</p>
  </div>
  )
}

const Page = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'))
  const title = searchParams.get('title')

  const [name, setName] = useState('');
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getLawyersByCategory(id),
    queryKey: ["lawyers"]
  })

  if (isLoading) return <p>Loading</p>
  if (isError) return <p>!!!ERROR!!!</p>
  
  const lawyersToShow = data.data.lawyers.filter((l: any) => l.name.includes(name))

  return (
    <div>
        <h1>{title}</h1>

        <div className="search-bar">
          <input type="text" value={name} onChange={handleNameChange} />

          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="32px" height="32px"><path fill="#B0B0B0" d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
        </div>

          <Suspense>
            <div className="card-grid">
              {lawyersToShow.map((lawyer: any) =>
                <Link key={lawyer.id} href={{
                  pathname: '/lawyers/lawyer',
                  query: { id: lawyer.id }
                }}>
                  <Lawyer name={lawyer.name} about={lawyer.about} image={lawyer.logo} />
                </Link>
              )}
            </div>
          </Suspense>
      </div>
  )
}

export default Page;