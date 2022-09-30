import React from "react";
import { articlesStore } from "../../store/index";
import SubscribeSection from "../SubscribeSection";

function ArticleBody({ data }) {
  const articles = articlesStore((state) => state.articles);
  console.log("Global articles ", articles);
  return (
    <div className=" w-full px-10 grid grid-cols-3 grid-flow-row">
      <div className="col-span-2">
        <h2 className=" text-2xl font-bold">{data.topic}</h2>
        <div
          className=" text-lg"
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      </div>
      <div className="">
        <SubscribeSection />
      </div>
    </div>
  );
}

export default ArticleBody;
