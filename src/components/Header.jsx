import HeaderImg from "../Images/chef.png"

export default function Header(){
    return(
        <header>
            <img src={HeaderImg} alt="chef-claude.png"></img>
            <h1>Chef Claude</h1>
        </header>
    )
}