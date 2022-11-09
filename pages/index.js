import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorite } from "../src/components/Favorite";

function HomePage() {

    const estiloDaHomePage = {
        display: "flex",
        flexDirection: "column",
        flex: 1
    };

    config.playlists;

    return (
        <>
            <CSSReset />
            <div style={estiloDaHomePage}>
                <Menu></Menu>
                <Header></Header>
                <Timeline playlists={config.playlists} />
                <Favorite favorites={config.favorites} />
            </div>
        </>
    );
}

export default HomePage

const StyleHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
        margin-top: 50px;
    }
`;

function Header() {
    return (
        <StyleHeader>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyleHeader>
    )
}

function Timeline(props) {
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favorite(props) {
    debugger
    const favorites = Object.keys(props.favorites);

    return   (
        <StyledFavorite>
            {favorites.map((favorite) => {
                const accounts = props.favorites[favorite];

                return (
                    <section>
                        <h2>{favorite}</h2>
                        <div>
                            {accounts.map((account) => {
                                return (
                                    <a href={account.url}>
                                        <img src={account.avatar} />
                                        <span>
                                            {account.name}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledFavorite>
    )
}