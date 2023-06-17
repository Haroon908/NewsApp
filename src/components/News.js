import React, {useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)


  

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    
  };



  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews=async ()=> {
    props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30)
    setloading( true )
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(parsedData.articles)
    setloading(false)
    settotalResults(parsedData.totalResults)
    props.setProgress(100)
  }


  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}  - RanaNews`

    updateNews();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  
  
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{marginTop:"70px"}}>RanaNews- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults.length}
          // loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col md-4" key={element.url}>
                  <NewsItem  title={element.title ? element.title.slice(0, 35) : ""} author={element.author} publishedAt={element.publishedAt} source={element.source.name} description={element.description ? element.description.slice(0, 45) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }


export default News