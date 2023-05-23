import React, { useState } from 'react';
import * as Styles from './Home.styled';
import { genV1, genV2 } from '../../utils/utils';
import styled, { CSSObject, css } from 'styled-components';


const getGen = (ver: number) => {
    switch (ver) {
        case 1:
            return genV1;
        default:
            return genV2;
    }
}

const VERSIONS = [1, 2] as const

type Version = typeof VERSIONS[number];

const Home: React.FC = (props: {}) => {
    const [key, setKey] = useState<string>('')
    const [website, setWebsite] = useState<string>('')
    const [version, setVersion] = useState<Version>(localStorage.getItem('version') ? parseInt(localStorage.getItem('version') as string) as Version : 2);
    const [withSpecial, setWithSpecial] = useState<boolean>(false);

    // save version in local storage
    React.useEffect(() => {
        localStorage.setItem('version', version.toString());
    }, [version])
    
    const result = (() => {
        const generator = getGen(version);

        const res = generator(website, key);

        if (withSpecial) {
            return `${res}!`;
        }
        return res
    })()

    const keyInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (keyInputRef.current) {
            keyInputRef.current.focus();
        }
    }, [keyInputRef])

    return <Styles.HomeContainer>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        }}>
            <Styles.Input ref={keyInputRef} placeholder='key' value={key} onChange={(e) => setKey(e.target.value)} type="password" />
            <Styles.Input placeholder='website' value={website} onChange={(e) => setWebsite(e.target.value.toLowerCase())} type="text" />
        </div>

        {/* version checkboxes */}
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '10px 10px 10px 0',
            gap: '20px',

        }}>
            <Con>
                <input type="radio" id="v1" name="version" value="1" checked={version === 1} onChange={() => setVersion(1)} />
                <label htmlFor="v1">v1</label>
            </Con>
            <Con>
                <input type="radio" id="v2" name="version" value="2" checked={version === 2} onChange={() => setVersion(2)} />
                <label htmlFor="v2">v2</label>
            </Con>
        </div>


        {/* withSpecial checkbox */}
        <div style={{
            padding: '10px 10px 10px 0',
            color: withSpecial ? 'green' : 'red',
            display: 'flex',
            alignItems: 'center',
        }}>
            <input type="checkbox" id="withSpecial" name="withSpecial" value="withSpecial" checked={withSpecial} onChange={() => setWithSpecial(!withSpecial)} />
            <label htmlFor="withSpecial">withSpecial</label>
        </div>


        <p>{key ? `RESULT: ${result}` : 'enter key'}</p>

        <button onClick={() => { navigator.clipboard.writeText(result); }}>Copy to clipboard</button>
    </Styles.HomeContainer>;
};

const Con = styled.div`
    display: flex;
    align-items: center;
    
    
`;

export default Home;
