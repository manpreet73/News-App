import React from 'react'

const NewsItem=(props)=> {
        let { title, description, url, newsUrl, author, date, src } = props;
        return (
            <div>
                <div className="card mb-4">
                    <span className="d-flex justify-content-end position-absolute badge rounded-pill bg-danger" style={{right:0}} >
                        {src}
                    </span>
                    <img src={!url ? "https://www.coindesk.com/resizer/Nr4jU2Atipu_8Z1GnDZAz4n2L-0=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/QCI5ET2VMRBC7HIV47677X34EY.jpg" : url} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }

export default NewsItem
