export const DEV_HELP_CHANNEL = '1351284738253656155';

export const SERVER_ID = '897514728459468821';

export const STELLA_CHANNEL = '1265827786111586344';

export interface ForumTag {
  id: string;
  name: string;
  moderated: boolean;
  emoji_id: null;
  emoji_name: null;
}

export function getTagById(id: string): ForumTag {
  const tag = available_tags.findIndex((value) => value.id === id);
  return tag > 0 ? available_tags[tag] : available_tags[0];
}

export const available_tags: ForumTag[] = [
  <ForumTag>{
    id: '1037076059079852093',
    name: 'auth',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1037076073244020816',
    name: 'cli',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1037076092252598313',
    name: 'deployment',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1037076122141212723',
    name: 'sdk',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1037076131796500540',
    name: 'rust',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1037396939932696667',
    name: 'test',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1037400513282572418',
    name: 'docs',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1038528333362765914',
    name: 'client',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1039271815320707142',
    name: 'protocol',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1047546403674652714',
    name: 'futurenet',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
  {
    id: '1158423895393702003',
    name: 'dapp',
    moderated: false,
    emoji_id: null,
    emoji_name: null,
  },
];
