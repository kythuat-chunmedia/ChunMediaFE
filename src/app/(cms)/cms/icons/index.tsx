import PlusIcon from "./plus.svg";
import CloseIcon from "./close.svg";
import BoxIcon from "./box.svg";
import CheckCircleIcon from "./check-circle.svg";
import AlertIcon from "./alert.svg";
import InfoIcon from "./info.svg";
import ErrorIcon from "./info-hexa.svg";
import BoltIcon from "./bolt.svg";
import ArrowUpIcon from "./arrow-up.svg";
import ArrowDownIcon from "./arrow-down.svg";
import FolderIcon from "./folder.svg";
import VideoIcon from "./videos.svg";
import AudioIcon from "./audio.svg";
import GridIcon from "./grid.svg";
import FileIcon from "./file.svg";
import DownloadIcon from "./download.svg";
import ArrowRightIcon from "./arrow-right.svg";
import GroupIcon from "./group.svg";
import BoxIconLine from "./box-line.svg";
import ShootingStarIcon from "./shooting-star.svg";
import DollarLineIcon from "./dollar-line.svg";
import TrashBinIcon from "./trash.svg";
import AngleUpIcon from "./angle-up.svg";
import AngleDownIcon from "./angle-down.svg";
import PencilIcon from "./pencil.svg";
import CheckLineIcon from "./check-line.svg";
import CloseLineIcon from "./close-line.svg";
import ChevronDownIcon from "./chevron-down.svg";
import ChevronUpIcon from "./chevron-up.svg";
import PaperPlaneIcon from "./paper-plane.svg";
import LockIcon from "./lock.svg";
import EnvelopeIcon from "./envelope.svg";
import UserIcon from "./user-line.svg";
import CalenderIcon from "./calender-line.svg";
import EyeIcon from "./eye.svg";
import EyeCloseIcon from "./eye-close.svg";
import TimeIcon from "./time.svg";
import CopyIcon from "./copy.svg";
import ChevronLeftIcon from "./chevron-left.svg";
import UserCircleIcon from "./user-circle.svg";
import TaskIcon from "./task-icon.svg";
import ListIcon from "./list.svg";
import TableIcon from "./table.svg";
import PageIcon from "./page.svg";
import PieChartIcon from "./pie-chart.svg";
import BoxCubeIcon from "./box-cube.svg";
import PlugInIcon from "./plug-in.svg";
import DocsIcon from "./docs.svg";
import MailIcon from "./mail-line.svg";
import HorizontaLDots from "./horizontal-dots.svg";
import ChatIcon from "./chat.svg";
import MoreDotIcon from "./more-dot.svg";
import BellIcon from "./bell.svg";
import SitemapIcon from "./sitemap.svg";

export {
  DownloadIcon,
  BellIcon,
  MoreDotIcon,
  FileIcon,
  GridIcon,
  AudioIcon,
  VideoIcon,
  BoltIcon,
  PlusIcon,
  BoxIcon,
  CloseIcon,
  CheckCircleIcon,
  AlertIcon,
  InfoIcon,
  ErrorIcon,
  ArrowUpIcon,
  FolderIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  GroupIcon,
  BoxIconLine,
  ShootingStarIcon,
  DollarLineIcon,
  TrashBinIcon,
  AngleUpIcon,
  AngleDownIcon,
  PencilIcon,
  CheckLineIcon,
  CloseLineIcon,
  ChevronDownIcon,
  PaperPlaneIcon,
  EnvelopeIcon,
  LockIcon,
  UserIcon,
  CalenderIcon,
  EyeIcon,
  EyeCloseIcon,
  TimeIcon,
  CopyIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  TaskIcon,
  PieChartIcon,
  BoxCubeIcon,
  PlugInIcon,
  DocsIcon,
  MailIcon,
  HorizontaLDots,
  ChevronUpIcon,
  ChatIcon,
  SitemapIcon
};


// Close Circle Icon
export const XIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39762 1.66667 1.66666 5.39763 1.66666 10C1.66666 14.6024 5.39762 18.3333 10 18.3333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 7.5L7.5 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 7.5L12.5 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);



export const RefreshCcwIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M21 21v-5h-5" />
  </svg>
);

export const GlobeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export const FileTextIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

export const LinkIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
