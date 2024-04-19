"use client";

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation";
import { getLawyerById } from "@/app/lib/lawyers";
import { Suspense } from "react";
import Image from "next/image";

const PersonalInfo = (props: { name: string, about: string, image: string }) => {
  return (
    <div dir="rtl" className="topic-card">
      <h2 className="topic-title">المعلومات الشخصية</h2>

      <div id="personal">
        <Image
          className="profile"
          loader={() => props.image}
          src={props.image}
          width={121.39}
          height={121.39}
          alt={props.name} />

          <div id="info">
            <h3>{props.name}</h3>
            <p>{props.about}</p>
            <p>5.00 التقييم العام من 154 من العملاء</p>
          </div>
      </div>

      <div id="comment">
        <p>تميز الاستشاري بالاحترافية والخبرة العالية في المسائل القانونية</p>

        <div id="commentor-info">
          <p>Abdullah Faleh</p>
          <p>الخميس 3 فبراير 2024</p>
        </div>
      </div>
    </div>
  )
}

const Brief = (props: { name: string }) => {
  return (
    <div dir="rtl" className="topic-card">
      <h2 className="topic-title">النبذة التعريفية</h2>
      <p className="description">استشاري القانون {props.name} وهو محام مرخص في المملكة العربية السعودية، .يحمل درجة البكالوريوس في القانون. يتمتع بخبرة تبلغ سنتين في مجال ممارسة القانون</p>
    </div>
  )
}

const Page = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'))

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getLawyerById(id),
    queryKey: ["lawyer"]
  })

  if (isLoading) return <p>Loading</p>
  if (isError) return <p>!!!ERROR!!!</p>

  console.log(data)

  return (
    <Suspense>
      <div id="row">
        <div id="info">
          <PersonalInfo name={data.data.lawyer.name} about={data.data.lawyer.about} image={data.data.lawyer.photo} />

          <Brief name={data.data.lawyer.name} />
        </div>

        <div id="billing">
        </div>
      </div>
    </Suspense>
  )
}

export default Page;