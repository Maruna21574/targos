// Upload obrázka do Supabase Storage
export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage.from('images').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false
  });
  if (error) {
    throw error;
  }
  // Vytvor URL na obrázok
  const url = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;
  return url;
};

import { createClient } from '@supabase/supabase-js';

// POZOR: Tieto hodnoty si doplňte zo svojho Supabase projektu (Settings -> API)
const supabaseUrl = process.env.SUPABASE_URL || 'https://htlnlhibuwarfqyjpggl.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_MSeNoFAHl7ZQdxp1ra6gzQ_H1pHmy08';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Chyba pri načítaní projektov:', error);
    return null;
  }
  return data;
};

export const saveProject = async (project: any) => {
  const { id, created_at, ...payload } = project;
  // Mapujeme 'desc' na 'desc_text' kvôli rezervovanému slovu v SQL
  const formattedPayload = {
    ...payload,
    desc_text: payload.desc || payload.desc_text
  };
  delete formattedPayload.desc;

  if (id && typeof id === 'number' && id > 1000000000000) { // Nový projekt vytvorený lokálnym timestampom
    const { data, error } = await supabase.from('projects').insert([formattedPayload]).select();
    return { data, error };
  } else if (id) { // Existujúci projekt v DB
    const { data, error } = await supabase.from('projects').update(formattedPayload).eq('id', id).select();
    return { data, error };
  } else {
    const { data, error } = await supabase.from('projects').insert([formattedPayload]).select();
    return { data, error };
  }
};

export const deleteProject = async (id: number) => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  return { error };
};
