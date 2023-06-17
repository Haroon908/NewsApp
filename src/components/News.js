import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}  - RanaNews`

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };



  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  async updateNews() {
    this.props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30)
    this.setState({ loading: false })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    })
    this.props.setProgress(100)
  }


  async componentDidMount() {
    this.updateNews()
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">RanaNews- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults.length}
          // loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
}

export default News