"use client";

import { getCategories, getCategoryNameById } from "./lib/categories"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "./globals.css"

const Category = (props: { image: string, title: string, count: number }) => {
  return (
    <div className="card">
      <Image
        loader={() => props.image}
        src={props.image}
        width={125}
        height={125}
        alt={props.title}
        className="card-image" />
      
      <h3>{props.title}</h3>

      <p>متوفر عدد {props.count}</p>
    </div>
  )
}

export default function Main() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getCategories(),
    queryKey: ["categories"]
  })

  if (isLoading) return <p>Loading</p>
  if (isError) return <p>!!!ERROR!!!</p>

  const titlesToShow = data.data.categories.filter((c: { title: string }) => c.title.includes(title))

  return (
    <div>
      <h1>الدليل الرقمي</h1>

      <div className="search-bar">
        <input type="text" value={title} onChange={handleTitleChange} />

        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="32px" height="32px"><path fill="#B0B0B0" d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
      </div>

      <div className="card-grid">
      {titlesToShow.map((cat: any) =>
        <Link key={cat.id} href={{
          pathname: '/lawyers',
          query: { id: cat.id, title: cat.title }}}>
          <Category image={cat.image} title={cat.title} count={cat.lawyers_count} />
        </Link>
      )}
    </div>
    </div>
  )
}