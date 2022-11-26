import React from "react";
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

    const [valorDoFiltro, setValorDoFiltro] = React.useState("Angular");

    return (
        <>
            <CSSReset />
            <div style={estiloDaHomePage}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}></Menu>
                <Banner />
                <Header></Header>
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
                <Favorite favorites={config.favorites} />
            </div>
        </>
    );
}

export default HomePage

const StyledBanner = styled.div`
  width: 100%;
  margin: 0 auto;
  img {
    margin-top: 50px;
    min-width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: 0px -210px;
  }
`;

function Banner() {
    return (
        <StyledBanner>
            <img src={`${config.banner}`} />
        </StyledBanner>
    )
}

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

function Timeline({ searchValue, ...props }) {
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
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
    const favorites = Object.keys(props.favorites);

    return (
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