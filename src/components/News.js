import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalizeFirstLetter =(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title=`${this.capitalizeFirstLetter(props.category)}- NewsToday`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cfc5521320846ada8a8593a8db8e80e&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults:parsedData.totalResults })
  }

   handleNextClick=async()=>{
    if (this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)) {
      
    }
    else{

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cfc5521320846ada8a8593a8db8e80e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
  
      this.setState({
        page:this.state.page+1,
        articles: parsedData.articles
      })
    }
  }

   handlePreviousClick= async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cfc5521320846ada8a8593a8db8e80e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()

    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles
    })
  }
  render() {
    return (
      <div className='container my-4'>
        <h2 className='mb-4 text-center'>NewsToday - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem author={element.author} date={element.publishedAt} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
          <div className="container d-flex justify-content-between mt-3">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark"  onClick={this.handlePreviousClick}>&larr; Privious</button>
            <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

          </div>

        </div>
      </div>
    )
  }
}

export default News