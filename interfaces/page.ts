import Page_ from '@/entity/page';

type Page = Pick<Page_, 'title' | 'url' | 'description' | 'date'>

export default Page;