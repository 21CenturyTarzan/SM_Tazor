import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import { ReactComponent as Telegram } from "../../assets/icons/telegram.svg";
import { ReactComponent as Youtube } from "../../assets/icons/youtube.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link href="https://www.youtube.com/channel/UChjZ8Zmj9sSOZCrAd8KWbKg" target="_blank">
        <SvgIcon color="primary" component={Youtube} />
      </Link>

      <Link href="https://t.me/+KTSfIMHcMnJlYzRh" target="_blank">
        <SvgIcon color="primary" component={Telegram} />
      </Link>

      <Link href="https://tazortaz.medium.com/" target="_blank">
        <SvgIcon color="primary" component={Medium} />
      </Link>

      <Link href="https://twitter.com/TazorTAZ" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="https://discord.gg/kRemEyFZjW" target="_blank">
        <SvgIcon color="primary" component={Discord} />
      </Link>
    </div>
  );
}
