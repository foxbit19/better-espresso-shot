import { siteConfig } from '@/config/site';
import React from 'react'
import { FacebookShare, RedditShare, TwitterShare, } from 'react-share-kit';

interface Props {
}

const ShareBar = (props: Props) => {
    return (
        <div className='flex flex-row gap-3 justify-center pt-20'>
            <FacebookShare round size={36} url={siteConfig.links.site} />
            <TwitterShare round size={36} url={siteConfig.links.site} />
            <RedditShare round size={36} url={siteConfig.links.site} />
        </div>
    )
}

export default ShareBar