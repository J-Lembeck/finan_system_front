import { ConfigProviderProps } from "antd/es/config-provider";
// import { ConfigProps } from "antd/lib/notification";
import { CSSProperties, ReactNode } from "react";

export interface INotification extends ConfigProviderProps {
	type: NotifType;
	message: string;
	icon?: ReactNode;
	style?: CSSProperties;
}

export type NotifType = 'success' | 'info' | 'warning' | 'error';
