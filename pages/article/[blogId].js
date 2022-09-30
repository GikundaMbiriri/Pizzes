import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ArticleHead from "../../components/article/ArticleHead";
import ArticleBody from "../../components/article/ArticleBody";
import Comments from "../../components/Comments";
import CommentsForm from "../../components/CommentsForm";
import { getArticle, getArticles } from "../../apis/articles";
import { useQuery } from "react-query";
import { articleStore } from "../../store/index";
import { MusicPlayer } from "../../components/player/PodcastPlayer";
function Article({ res }) {
  const router = useRouter();
  const { blogId } = router.query;
  const storeArticle = articleStore((state) => state.setArticle);
  const storeComments = articleStore((state) => state.setComments);

  const { data, isLoading } = useQuery(
    ["article", blogId],
    () => getArticle(blogId),
    {
      initialData: res,
    }
  );
  const [article, setArticle] = useState(data.data);
  const [comments, setComments] = useState(data.data?.comments);
  useEffect(() => {
    storeArticle(article);
    storeComments(comments);
  }, [article, comments]);
  return (
    <>
      <div>
        <Head>
          <title>{article?.topic}</title>
        </Head>
        <div className=" w-screen">
          <ArticleHead image={article?.image[0]} topic={article?.topic} />
          <ArticleBody data={article} />
          <div className="w-full px-10 grid grid-cols-3 grid-flow-row">
            <div className=" col-span-2">
              <Comments comments={comments} />
            </div>

            <div className=" col-span-1 ">
              <CommentsForm id={blogId} />
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <MusicPlayer />
    </>
  );
}
export async function getStaticPaths() {
  const res = await getArticles();
  const paths = res?.data?.map((blog) => ({ params: { blogId: blog.blogId } }));
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}
export async function getStaticProps({ params: { blogId } }) {
  const res = await getArticle(blogId);
  delete res["config"];
  delete res["request"];
  return { props: { res } };
}
export default Article;
