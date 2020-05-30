import { RouteComponentProps } from 'react-router-dom'
export type PageProps = RouteComponentProps<{}>
export type IdPageProps = {} & RouteComponentProps<{ id: string }>;
export type ProductPageProps = {} & RouteComponentProps<{ productId: string, articleId: string, }>;
export type TagPageProps = {} & RouteComponentProps<{ tag: string }>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type SelectChangeEvent = React.ChangeEvent<{ value: unknown }>
export type ClickEvent = React.MouseEvent<HTMLAnchorElement, MouseEvent>
