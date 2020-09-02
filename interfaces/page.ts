import Page_ from '@/entity/page';

type Page = Pick<Page_, 'title' | 'url' | 'description' | 'date' | 'isRead' | 'id'>

export default Page;