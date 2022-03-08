import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    articles = [
        {
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": "By Maureen Chowdhury, Mike Hayes, Jason Kurtz and Melissa Macaya, CNN",
            "title": "Biden's State of the Union address 2022: Live updates - CNN",
            "description": "President Biden is giving his first State of the Union address tonight. Watch live and follow here for updates and analysis.",
            "url": "https://www.cnn.com/politics/live-news/biden-state-of-the-union-2022/index.html",
            "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/220301212046-bpt102-biden-sotu-030122-super-tease.jpg",
            "publishedAt": "2022-03-02T16:31:00Z",
            "content": "President Biden delivered his first State of the Union address tonight where he touched on a multitude of issues the US is facing on both the domestic and foreign fronts, while also reaffirming to Am… [+3635 chars]"
        },
        {
            "source": {
                "id": "reuters",
                "name": "Reuters"
            },
            "author": null,
            "title": "Russian advances on Ukraine cities stall - Reuters",
            "description": "Ukrainians said on Wednesday they were battling on in the port of Kherson, the first sizeable city Russia claimed to have seized, as air strikes and bombardment caused devastation in cities that Moscow's bogged down forces have failed to capture.",
            "url": "https://www.reuters.com/world/europe/top-wrap-10-ukrainians-say-they-are-fighting-biggest-city-yet-claimed-by-russia-2022-03-02/",
            "urlToImage": "https://www.reuters.com/resizer/M551l2UH59jCj4Qk-FCTMDIfqs0=/728x381/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/32P3AJ2675N5HO4VGSWLIH3KZU.jpg",
            "publishedAt": "2022-03-02T16:30:00Z",
            "content": "KYIV/KHARKIV, March 2 (Reuters) - Ukrainians said on Wednesday they were battling on in the port of Kherson, the first sizeable city Russia claimed to have seized, as air strikes and bombardment caus… [+6452 chars]"
        },
        {
            "source": {
                "id": "reuters",
                "name": "Reuters"
            },
            "author": null,
            "title": "U.S. private payrolls rise solidly; January revised sharply higher - Reuters",
            "description": "U.S. private employers hired more workers than expected in February and data for the prior month was revised sharply higher to show strong job gains instead of losses, aligning with other reports that have painted an upbeat picture of the labor market.",
            "url": "https://www.reuters.com/business/us-private-payrolls-increase-solidly-february-adp-2022-03-02/",
            "urlToImage": "https://www.reuters.com/resizer/HcRSVSSd98mG7I5M1dXbadg6OG8=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/WX7LQ7NWJBKL5P6OXM3S6SUBG4.jpg",
            "publishedAt": "2022-03-02T15:57:00Z",
            "content": "WASHINGTON, March 2 (Reuters) - U.S. private employers hired more workers than expected in February and data for the prior month was revised sharply higher to show strong job gains instead of losses,… [+4469 chars]"
        }
    ]
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8206e4b9b724d82ad06cb82b5f0c2b0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsdData = await data.json()
        this.setState({
            articles: parsdData.articles,
            totalResults: parsdData.totalResults,
            loading: false
        })

    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8206e4b9b724d82ad06cb82b5f0c2b0&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsdData = await data.json()
        // this.setState({
        //     articles: parsdData.articles,
        //     totalResults: parsdData.totalResults,
        //     loading: false
        // })
        this.updateNews();
    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8206e4b9b724d82ad06cb82b5f0c2b0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsdData = await data.json()

        // this.setState({
        //     page:this.state.page - 1,
        //     articles : parsdData.articles,
        //     loading : false
        // })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();

    }
    handleNextClick = async () => {
        // if(!(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8206e4b9b724d82ad06cb82b5f0c2b0&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsdData = await data.json()
        // this.setState({
        //     page:this.state.page + 1,
        //     articles : parsdData.articles,
        //     loading : false
        // })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>NewsMonkey - Top Headline</h1>
                {this.state.loading && <Spinner />}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
