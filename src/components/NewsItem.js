import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title,description,imageUrl,newsUrl,author,publishedAt,source} = this.props
    return (
      <div className='my-3' style={{width: "18rem"}}>
        <div className="card">
          <img src={!imageUrl?'https://www.whitehouse.gov/wp-content/uploads/2021/01/16_abraham_lincoln.jpg':imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <span class="badge bg-success">{source}</span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><b>Author:</b>{!author?'unknown':author}</p>
            <p className="card-text"><b>Published at:</b>{new Date(publishedAt).toGMTString()}</p>
            <a href={!newsUrl?'https://getbootstrap.com/docs/5.0/components/card/':newsUrl} target='_blank' rel='noreferrer' className="btn btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem