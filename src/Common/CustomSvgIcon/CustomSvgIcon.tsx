import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

const CustomSvgIcon = (props: any) => {
  const { name, size, color, ...otherProps } = props;

  const icons = () => {
    switch (name) {

      case "edit":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: size }}
          // {...otherProps}
          >
            <g clip-path="url(#clip0_447_660)">
              <path
                d="M3 14.7737H6.33333L15.0833 6.02369C15.3022 5.80482 15.4758 5.54498 15.5943 5.25902C15.7127 4.97305 15.7737 4.66655 15.7737 4.35702C15.7737 4.04749 15.7127 3.741 15.5943 3.45503C15.4758 3.16906 15.3022 2.90923 15.0833 2.69036C14.8645 2.47149 14.6046 2.29787 14.3187 2.17942C14.0327 2.06097 13.7262 2 13.4167 2C13.1071 2 12.8006 2.06097 12.5147 2.17942C12.2287 2.29787 11.9689 2.47149 11.75 2.69036L3 11.4404V14.7737Z"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M10.9166 3.52368L14.25 6.85701"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M2 17.4H18"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                fill="none"
              />
            </g>
            <defs>
              <clipPath id="clip0_447_660">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );

      case "close":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_435_522)">
              <path
                d="M15 5L5 15"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 5L15 15"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_435_522">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );

      case "delete":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_447_652)">
              <path
                d="M3.33337 5.83331H16.6667"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M8.33337 9.16669V14.1667"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M11.6666 9.16669V14.1667"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M4.16663 5.83331L4.99996 15.8333C4.99996 16.2753 5.17555 16.6993 5.48811 17.0118C5.80068 17.3244 6.2246 17.5 6.66663 17.5H13.3333C13.7753 17.5 14.1992 17.3244 14.5118 17.0118C14.8244 16.6993 15 16.2753 15 15.8333L15.8333 5.83331"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M7.5 5.83333V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5.83333"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </g>
            <defs>
              <clipPath id="clip0_447_652">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );
      case "add":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_688_13408)">
              <path
                d="M10 4.16669V15.8334"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M4.16663 10H15.8333"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </g>
            <defs>
              <clipPath id="clip0_688_13408">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );


      case "arrow_down":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_1226_359)">
              <path d="M5 8.33331L10 13.3333L15 8.33331H5Z" fill={color} />
            </g>
            <defs>
              <clipPath id="clip0_1226_359">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );
      case "settings":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_501_4870)">
              <path
                d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </g>
            <defs>
              <clipPath id="clip0_501_4870">
                <rect width={size} height={size} fill="white" />
              </clipPath>
            </defs>
          </SvgIcon>
        );



      case "left_arrow":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_501_3858)">
              <path
                d="M15.8334 10L4.16671 10"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.16663 15L4.16663 10"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.16663 5L4.16663 10"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_501_3858">
                <rect width={size} height={size} fill="white" />
              </clipPath>
            </defs>
          </SvgIcon>
        );

      case "right_arrow":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_3047_60479)">
              <path
                d="M4.16602 10L15.8327 10"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.834 5L15.834 10"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.834 15L15.834 10"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3047_60479">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </SvgIcon>
        );

      case "tick":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <path
              d="M4.65833 8.81667L1.18333 5.34167L0 6.51667L4.65833 11.175L14.6583 1.175L13.4833 0L4.65833 8.81667Z"
              fill={color}
            />
          </SvgIcon>
        );


      case "view":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_447_638)">
              <path
                d="M8.33337 9.99998C8.33337 10.442 8.50897 10.8659 8.82153 11.1785C9.13409 11.4911 9.55801 11.6666 10 11.6666C10.4421 11.6666 10.866 11.4911 11.1786 11.1785C11.4911 10.8659 11.6667 10.442 11.6667 9.99998C11.6667 9.55795 11.4911 9.13403 11.1786 8.82147C10.866 8.50891 10.4421 8.33331 10 8.33331C9.55801 8.33331 9.13409 8.50891 8.82153 8.82147C8.50897 9.13403 8.33337 9.55795 8.33337 9.99998Z"
                stroke={color}
                fill="none"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z"
                stroke={color}
                fill="none"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_912_9386">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );

      case "file":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_1504_10953)">
              <path
                d="M37.333 8V18.6667C37.333 19.3739 37.614 20.0522 38.1141 20.5523C38.6142 21.0524 39.2924 21.3333 39.9997 21.3333H50.6663"
                stroke={color}
                fill="none"
                stroke-width="1.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30.6663 56H18.6663C17.2519 56 15.8953 55.4381 14.8951 54.4379C13.8949 53.4377 13.333 52.0812 13.333 50.6667V13.3333C13.333 11.9188 13.8949 10.5623 14.8951 9.5621C15.8953 8.5619 17.2519 8 18.6663 8H37.333L50.6663 21.3333V34.6667"
                stroke={color}
                fill="none"
                stroke-width="1.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M50.666 57L50.666 41.3333M50.666 41.3333L42.666 49.3333M50.666 41.3333L58.666 49.3333"
                stroke={color}
                fill="none"
                stroke-width="1.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_912_9386">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );

      case "send_arrow":
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clip-path="url(#clip0_1409_21434)">
              <path
                d="M8.33337 11.6667L17.5 2.5"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M17.5001 2.5L12.0834 17.5C12.0468 17.5798 11.9881 17.6474 11.9143 17.6948C11.8404 17.7422 11.7545 17.7674 11.6667 17.7674C11.579 17.7674 11.493 17.7422 11.4192 17.6948C11.3453 17.6474 11.2866 17.5798 11.2501 17.5L8.33339 11.6667L2.50006 8.75C2.42027 8.71344 2.35266 8.65474 2.30526 8.58088C2.25786 8.50701 2.23267 8.4211 2.23267 8.33333C2.23267 8.24557 2.25786 8.15965 2.30526 8.08579C2.35266 8.01193 2.42027 7.95323 2.50006 7.91667L17.5001 2.5Z"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </g>
            <defs>
              <clipPath id="clip0_912_9386">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );

      case 'file_upload': return (
        <SvgIcon
          fill="none"
          color={color}
          style={{ fontSize: size, width: size, height: "auto" }}
          {...otherProps}
        >

          <g clip-path="url(#clip0_3996_1625)">
            <path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke={color} fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.5 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V13" stroke={color} fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19 23L19 16M19 16L16 19M19 16L22 19" stroke={color} fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
          </g>


          <defs>
            <clipPath id="clip0_912_9386">
              <rect width={size} height={size} fill={color} />
            </clipPath>
          </defs>
        </SvgIcon>
      );

      case 'image_upload': return (
        <SvgIcon
          fill="none"
          color={color}
          style={{ fontSize: size, width: size, height: "auto" }}
          {...otherProps}
        >
          <path d="M15 8H15.01" stroke={color}
            strokeWidth="1.2" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12.5 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V12.5" stroke={color}
            strokeWidth="1.2" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 16L8 11C8.928 10.107 10.072 10.107 11 11L14.5 14.5" stroke={color}
            strokeWidth="1.2" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14 14L15 13C15.679 12.347 16.473 12.171 17.214 12.474" stroke={color}
            strokeWidth="1.2" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M19 22V16" stroke={color}
            strokeWidth="1.2" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M22 19L19 16L16 19" stroke={color}
            strokeWidth="1.2" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <defs>
            <clipPath id="clip0_912_9386">
              <rect width={size} height={size} fill={color} />
            </clipPath>
          </defs>
        </SvgIcon>
      );


      default:
        return (
          <SvgIcon
            fill="none"
            color={color}
            style={{ fontSize: size, width: size, height: "auto" }}
            {...otherProps}
          >
            <g clipPath="url(#clip0)">
              <path
                d="M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H12.5"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M18.2556 14.5853C18.4449 13.8049 19.5551 13.8049 19.7444 14.5853C19.7729 14.7026 19.8285 14.8115 19.907 14.9031C19.9854 14.9948 20.0844 15.0666 20.1958 15.1128C20.3073 15.159 20.4281 15.1782 20.5483 15.1688C20.6686 15.1595 20.785 15.1219 20.888 15.0591C21.5738 14.6413 22.3591 15.4262 21.9413 16.1124C21.8786 16.2154 21.8411 16.3317 21.8318 16.4519C21.8225 16.5721 21.8417 16.6928 21.8878 16.8042C21.9339 16.9156 22.0057 17.0145 22.0972 17.0929C22.1888 17.1713 22.2975 17.2271 22.4147 17.2556C23.1951 17.4449 23.1951 18.5551 22.4147 18.7444C22.2974 18.7729 22.1885 18.8285 22.0969 18.907C22.0052 18.9854 21.9334 19.0844 21.8872 19.1958C21.841 19.3073 21.8218 19.4281 21.8312 19.5483C21.8405 19.6686 21.8781 19.785 21.9409 19.888C22.3587 20.5738 21.5738 21.3591 20.8876 20.9413C20.7846 20.8786 20.6683 20.8411 20.5481 20.8318C20.4279 20.8225 20.3072 20.8417 20.1958 20.8878C20.0844 20.9339 19.9855 21.0057 19.9071 21.0972C19.8287 21.1888 19.7729 21.2975 19.7444 21.4147C19.5551 22.1951 18.4449 22.1951 18.2556 21.4147C18.2271 21.2974 18.1715 21.1885 18.093 21.0969C18.0146 21.0052 17.9156 20.9334 17.8042 20.8872C17.6927 20.841 17.5719 20.8218 17.4517 20.8312C17.3314 20.8405 17.215 20.8781 17.112 20.9409C16.4262 21.3587 15.6409 20.5738 16.0587 19.8876C16.1214 19.7846 16.1589 19.6683 16.1682 19.5481C16.1775 19.4279 16.1583 19.3072 16.1122 19.1958C16.0661 19.0844 15.9943 18.9855 15.9028 18.9071C15.8112 18.8287 15.7025 18.7729 15.5853 18.7444C14.8049 18.5551 14.8049 17.4449 15.5853 17.2556C15.7026 17.2271 15.8115 17.1715 15.9031 17.093C15.9948 17.0146 16.0666 16.9156 16.1128 16.8042C16.159 16.6927 16.1782 16.5719 16.1688 16.4517C16.1595 16.3314 16.1219 16.215 16.0591 16.112C15.6413 15.4262 16.4262 14.6409 17.1124 15.0587C17.5569 15.3289 18.1329 15.0898 18.2556 14.5853Z"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M18 18C18 18.2652 18.1054 18.5196 18.2929 18.7071C18.4804 18.8946 18.7348 19 19 19C19.2652 19 19.5196 18.8946 19.7071 18.7071C19.8946 18.5196 20 18.2652 20 18C20 17.7348 19.8946 17.4804 19.7071 17.2929C19.5196 17.1054 19.2652 17 19 17C18.7348 17 18.4804 17.1054 18.2929 17.2929C18.1054 17.4804 18 17.7348 18 18Z"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width={size} height={size} fill={color} />
              </clipPath>
            </defs>
          </SvgIcon>
        );
    }
  };

  return <>{icons()}</>;
};

export default CustomSvgIcon;
