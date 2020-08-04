import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';
import metascraperDescription from 'metascraper-description';
import metascraperDate from 'metascraper-date';

export interface Meta {
  title: string;
  url: string;
  description: string;
  date: string;
}

export default metascraper([
  metascraperTitle(),
  metascraperUrl(),
  metascraperDescription(),
  metascraperDate(),
])