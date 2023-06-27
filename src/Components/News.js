import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

    const capitalize= word => word.charAt(0).toUpperCase() + word.slice(1);
    const [articles,setArticles]= useState([]);
    const [loading,setLoading]= useState(true);
    const [page,setPage]= useState(1);
    const [totalResults,setTotalResults]= useState(0);
        // document.title=`${capitalize(props.category)} - NewsMonkey`
    
    const updateNews=async()=>{
      let Url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      props.setProgress(10);
      let data= await fetch(Url);
      props.setProgress(30);
      let parsedData= await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
        props.setProgress(100);
    }
    useEffect(()=>{
      updateNews();
    },[])

    const fetchMoreData= async()=>{
      
      let Url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data= await fetch(Url);
      let parsedData= await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }

    // handlePrevious= async()=>{
    //   let Url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
    //   setState({loading:true});
    //   let data= await fetch(Url);
    //   let parsedData= await data.json();
    //   setState({
    //     page:page - 1,
    //     articles:parsedData.articles,
    //     loading:false
    //   })
    //   // setState({page:page - 1})
    //   // updateNews();
    // }

    // handleNext=async()=>{
    //   if(page + 1 > Math.ceil(totalResults/props.pageSize)){
    //   }
    //   else{
    //   let Url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    //   pagesetState({loading:true});
    //   let data= await fetch(Url);
    //   let parsedData= await data.json();
    //   setState({
    //     page:page + 1,
    //     articles:parsedData.articles,
    //     loading:false
    //   })
    // }
   
    // setState({page:page + 1})
    // updateNews();
    // }

    return (
      <>
        <h2 className='text-center mb-5' style={{marginTop: '100px'}}>NewsMonkey - Top {capitalize(props.category)} Headlines</h2>
        {  loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
        {articles.map(element=> {
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title} description={element.description} url={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} src={element.source.name} />
        </div>
        })}
        </div>
        </div>
            </InfiniteScroll> 

        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={page<=1} onClick={handlePrevious} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} onClick={handleNext} className="btn btn-dark">Next &rarr;</button>
        </div> */}
      </>
    )
  }


News.defaultProps={
  country:'in',
  category:'general',
  pageSize:12
}
News.propTypes={
  country:PropTypes.string,
  category:PropTypes.string,
  pageSize:PropTypes.number
}

export default News
