import { ReactComponent as ForumIcon } from "../../assets/icons/forum.svg";
import { ReactComponent as GovIcon } from "../../assets/icons/governance.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import { ReactComponent as BridgeIcon } from "../../assets/icons/bridge.svg";
import { ReactComponent as YoutubeIcon } from "../../assets/icons/youtube.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { ReactComponent as DiscordIcon } from "../../assets/icons/discord.svg";
import { ReactComponent as MediumIcon } from "../../assets/icons/medium.svg";
import { ReactComponent as TelegramIcon } from "../../assets/icons/telegram.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/icons/linkedin.svg";
import { SvgIcon } from "@material-ui/core";
import { Trans } from "@lingui/macro";

const externalUrls = [
  // {
  //   title: <Trans>Forum</Trans>,
  //   url: "https://forum.olympusdao.finance/",
  //   icon: <SvgIcon color="primary" component={ForumIcon} />,
  // },
  // {
  //   title: <Trans>Governance</Trans>,
  //   url: "https://vote.olympusdao.finance/",
  //   icon: <SvgIcon color="primary" component={GovIcon} />,
  // },
  {
    title: <Trans>User Guide</Trans>,
    url: "https://tazor.gitbook.io/tazor/",
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  },
  {
    title: <Trans>How to's</Trans>,
    url: "https://www.youtube.com/channel/UChjZ8Zmj9sSOZCrAd8KWbKg",
    icon: <SvgIcon color="primary" component={YoutubeIcon} />,
  },
  {
    title: <Trans>Announcements</Trans>,
    url: "https://twitter.com/TazorTAZ",
    icon: <SvgIcon color="primary" component={TwitterIcon} />,
  },
  {
    title: <Trans>Community</Trans>,
    url: "https://discord.gg/kRemEyFZjW",
    icon: <SvgIcon color="primary" component={DiscordIcon} />,
  },
  {
    title: <Trans>Telegram</Trans>,
    url: "https://t.me/TazorTaz",
    icon: <SvgIcon color="primary" component={TelegramIcon} />,
  },
  {
    title: <Trans>Press Release</Trans>,
    url: "https://tazortaz.medium.com/",
    icon: <SvgIcon color="primary" component={MediumIcon} />,
  },
  {
    title: <Trans>Linkedin</Trans>,
    url: "https://www.linkedin.com/groups/12655099/",
    icon: <SvgIcon color="primary" component={LinkedinIcon} />,
  },
];

export default externalUrls;
