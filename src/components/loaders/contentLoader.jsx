import React from 'react'
import ContentLoader from 'react-content-loader'

const contentLoader = props => {
    return (
        <ContentLoader
            height={55}
            width={400}
            speed={2}
            primaryColor="#eef3ef"
            secondaryColor="#76c0f5">
            <circle cx="40" cy="19" r="4" />
            <rect x="50" y="15" rx="5" ry="3" width="300" height="7" />
            <circle cx="40" cy="39" r="4" />
            <rect x="50" y="35" rx="5" ry="3" width="300" height="7" />

        </ContentLoader>
    )
}

export default contentLoader;