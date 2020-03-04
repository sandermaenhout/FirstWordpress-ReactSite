import React from 'react';

export function getImage(user) {
    const { avatar_urls, meta } = user;
    let avatar_url = '';
    if (typeof avatar_urls === 'undefined') {
        return '';
    }

    if (typeof meta !== 'undefined') {
        if (typeof meta['avatar'] !== 'undefined') {
            if (meta['avatar'].length) {
                avatar_url = meta['avatar'][0];
            }
        }
    }

    if (!avatar_url && !Object.keys(avatar_urls).length) {
        return '';
    }

    if (!avatar_url) {
        const keys = Object.keys(avatar_urls);
        avatar_url = avatar_urls[keys[keys.length - 1]];
    }

    return <img src={avatar_url} alt='Avatar' />
}