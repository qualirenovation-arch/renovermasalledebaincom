-- Add MIME type restrictions to subcontractor-files bucket
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'application/pdf',
  'image/jpeg',
  'image/png'
]
WHERE id = 'subcontractor-files';