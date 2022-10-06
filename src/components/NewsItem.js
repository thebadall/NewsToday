import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl, newsUrl,author, date} = this.props;
    return (
      <div>
        <div className="card" >
          <img src={!imageUrl?"https://profootballtalk.nbcsports.com/wp-content/uploads/sites/25/2022/09/USATSI_18994636-e1663815626525.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem