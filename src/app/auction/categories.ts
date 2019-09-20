export interface CategoryGroup {
    name: string;
    categories: string[];
}

export const CategoryGroups = [
    {
        name: 'Antiques',
        categories: [
            'Antiquities',
            'Architectural & Garden',
            'Decorative Arts',
            'Ethnographic',
            'Furniture',
            'Home & Hearth',
            'Linens & Textiles (Pre-1930)',
            'Maps Atlases & Globes',
            'Maritime',
            'Mercantile',
            'Musical Instruments (Pre-1930)',
            'Science & Medicine (Pre-1930)',
            'Sewing (Pre-1930)',
            'Silver',
            'Other Antiques'
        ]
    },
    {
        name: 'Art',
        categories: [
            'Art Posters',
            'Art Drawings',
            'Art Photographs',
            'Art Prints',
            'Art Sculptures',
            'Folk Art & Indigenous Art',
            'Mixed Media Art & Collage Art',
            'Paintings',
            'Textile Art & Fiber Art',
            'Other'
        ]
    },
    {
        name: 'Baby',
        categories: [
            'Baby Gear',
            'Baby Safety & Health',
            'Bathing & Grooming',
            'Car Safety Seats',
            'Carriers Slings & Backpacks',
            'Diapering',
            'Feeding',
            'Keepsakes & Baby Announcements',
            'Nursery Bedding',
            'Nursery Décor',
            'Nursery Furniture',
            'Potty Training',
            'Strollers & Accessories',
            'Toys for Baby',
            'Other'
        ]
    },
    {
        name: 'Books',
        categories: [
            'Accessories',
            'Antiquarian',
            'Audiobooks',
            'Catalogs',
            'Children & Young Adult',
            'Cookbooks',
            'Fiction & Literature',
            'Magazine Back Issues',
            'Nonfiction',
            'Textbooks',
            'Wholesale & Bulk Lots',
            'Other'
        ]
    },
    {
        name: 'Business & Industrial',
        categories: [
            'Adhesives  Sealants & Tapes',
            'Agriculture & Forestry ',
            'Automation  Motors & Drives ',
            'Building Materials & Supplies ',
            'Cleaning & Janitorial Supplies ',
            'CNC Metalworking & Manufacturing',
            'Electrical Equipment & Supplies',
            'Facility Maintenance & Safety',
            'Fasteners & Hardware',
            'Fuel & Energy',
            'Healthcare Lab & Dental',
            'Heavy Equipment Parts & Attachments',
            'HVAC ',
            'Hydraulics',
            'Light Equipment & Tools',
            'Material Handling',
            'Office',
            'Printing & Graphic Arts',
            'Restaurant & Food Service',
            'Retail & Services ',
            'Test Measurement & Inspection',
            'Other'
        ]
    },
    {
        name: 'Cameras & Photo',
        categories: [
            'Binoculars & Telescopes',
            'Camcorders',
            'Camera & Photo Accessories',
            'Camera Drones',
            'Camera Drone Parts & Accs',
            'Camera Manuals & Guides',
            'Digital Cameras',
            'Digital Photo Frames',
            'Film Photography',
            'Flashes & Flash Accessories',
            'Lenses & Filters',
            'Lighting & Studio',
            'Replacement Parts & Tools',
            'Tripods & Supports',
            'Video Production & Editing',
            'Vintage Movie & Photography',
            'Other'
        ]
    },
    {
        name: 'Cell Phones & Accessories',
        categories: [
            'Cell Phones & Smartphones',
            'Smart Watches',
            'Smart Watch Accessories',
            'Cell Phone Accessories',
            'Display Phones',
            'PDAs',
            'PDA Accessories',
            'Phone Cards & SIM Cards',
            'Cell Phone & Smartphone Parts',
            'Ringtones',
            'Vintage Cell Phones',
            'Other'
        ]
    },
    {
        name: 'Clothing, Shoes & Accessories',
        categories: [
            'Baby & Toddler Clothing',
            'Kids Clothing',
            'Costumes',
            'Dancewear',
            'Mens Accessories',
            'Mens Clothing',
            'Mens Shoes',
            'Uniforms & Work Clothing',
            'Unisex Clothing',
            'Wedding & Formal Occasion',
            'Womens Accessories',
            'Womens Clothing',
            'Womens Bags & Handbags',
            'Womens Shoes',
            'Vintage',
            'World & Traditional Clothing',
            'Clothing & Shoe Care',
            'Other'
        ]
    },
    {
        name: 'Collectibles',
        categories: [
            'Advertising',
            'Animals',
            'Animation Art & Characters',
            'Arcade',
            'Autographs',
            'Barware',
            'Beads',
            'Bottles & Insulators',
            'Breweriana',
            'Casino',
            'Clocks',
            'Comics',
            'Decorative Collectibles',
            'Virtual & Crypto Collectibles',
            'Fantasy',
            'Historical Memorabilia',
            'Holiday & Seasonal',
            'Kitchen & Home',
            'Knives Swords & Blades',
            'Lamps &Lighting',
            'Linens & Textiles (1930-Now)',
            'Metalware',
            'Militaria',
            'Non-Sport Trading Cards',
            'Pens & Writing Instruments',
            'Phone Cards',
            'Photographic Images',
            'Postcards',
            'Religion & Spirituality',
            'Rocks Fossils & Minerals',
            'Science Fiction & Horror',
            'Science & Medicine (1930-Now',
            'Sewing (1930-Now)',
            'Souvenirs & Travel Memorabilia',
            'Tobacciana',
            'Tools',
            'Transportation',
            'Vanity',
            'Vintage',
            'Other'
        ]
    },
    {
        name: 'Computers / Tablets & Networking',
        categories: [
            '3D Printers & Supplies',
            'Tablets & eBook Readers',
            'Laptops & Netbooks',
            'Desktops & All-In-Ones',
            'Laptop & Desktop Accessories',
            'Computer Cables & Connectors',
            'Computer Components & Parts',
            'Drives Storage & Blank Media',
            'Enterprise Networking',
            'Home Networking & Connectivity ',
            'Keyboards & Mice',
            'Monitors Projectors & Accs',
            'Power Protection',
            'Printers',
            'Software ',
            'Manuals & Resources',
            'Vintage Computing',
            'Other'
        ]
    },
    {
        name: 'Consumer Electronics',
        categories: [
            'Surveilance & Smart Home Electronics',
            'Virtual Reality',
            'Portable Audio & Headphones',
            'TV  Video & Home Audio',
            'Vehicle Electronics & GPS',
            'Home Telephones & Accessories',
            'Multipurpose Batteries & Power',
            'Radio Communication',
            'Smart Glasses',
            'Vintage Electronics',
            'Other'
        ]
    },
    {
        name: 'Crafts',
        categories: [
            'Art Supplies',
            'Beads & Jewelry Making ',
            'Fabric',
            'Fabric Painting & Decorating ',
            'Glass & Mosaics',
            'Handcrafted & Finished Pieces',
            'Home Arts & Crafts',
            'Kids Crafts',
            'Leathercrafts',
            'Multi-Purpose Craft Supplies',
            'Needlecrafts & Yarn',
            'Scrapbooking & Paper Crafts',
            'Sewing',
            'Sculpting',
            'Stamping & Embossing',
            'Other'
        ]
    },
    {
        name: 'Dolls & Bears',
        categories: [
            'Bear Making Supplies',
            'Bears',
            'Dolls',
            'Dollhouses',
            'Paper Dolls',
            'Other'
        ]
    },
    {
        name: 'DVDs & Movies',
        categories: [
            'DVDs & Blu-ray Discs',
            'Film Stock',
            'Laserdiscs',
            'UMDs',
            'VHS Tapes',
            'Other Formats',
            'Storage & Media Accessories',
            'Other'
        ]
    },
    {
        name: 'Gift Cards & Coupons',
        categories: [
            'Gift Cards',
            'Gift Certificates',
            'Coupons',
            'Digital Gifts',
            'Other'
        ]
    },
    {
        name: 'Health & Beauty',
        categories: [
            'Bath & Body',
            'Fragrances',
            'Hair Care & Styling',
            'Health Care"',
            'Makeup',
            'Massage',
            'Medical & Mobility',
            'Nail Care',
            'Natural & Alternative Remedies',
            'Oral Care',
            'Salon & Spa Equipment',
            'Shaving & Hair Removal',
            'Skin Care',
            'Sun Protection & Tanning',
            'Tattoos & Body Art',
            'Vision Care',
            'Vitamins & Dietary Supplements',
            'E-Cigarettes Vapes & Accs',
            'Other'
        ]
    },
    {
        name: 'Home & Garden',
        categories: [
            'Bar',
            'Bath ',
            'Bedding',
            'Food & Beverages',
            'Fresh Cut Flowers & Supplies',
            'Furniture',
            'Holiday & Seasonal Décor',
            'Home Improvement',
            'Household Supplies & Cleaning',
            'Kitchen & Dining',
            'Lamps Lighting & Ceiling Fans',
            'Major Appliances',
            'Rugs & Carpets',
            'Tools & Workshop Equipment',
            'Wedding Supplies',
            'Window Treatments & Hardware',
            'Yard Garden & Outdoor Living',
            'Other'
        ]
    },
    {
        name: 'Jewelry & Watches',
        categories: [
            'Engagement & Wedding',
            'Ethnic Regional & Tribal',
            'Fashion Jewelry',
            'Fine Jewelry',
            'Handcrafted',
            'Jewelry Boxes & Organizers',
            'Jewelry Design & Repair',
            'Loose Beads',
            'Loose Diamonds & Gemstones',
            'Mens Jewelry',
            'Vintage & Antique Jewelry',
            'Watches',
            'Other'
        ]
    },
    {
        name: 'Music',
        categories: [
            'Cassettes',
            'CDs',
            'Records',
            'Other Formats',
            'Storage & Media Accessories',
            'Other'
        ]
    },
    {
        name: 'Musical Instruments & Gear',
        categories: [
            'Brass',
            'DJ Equipment',
            'Guitars & Basses',
            'Instruction Books',
            'Percussion',
            'Pianos',
            'Pro Audio Equipment',
            'Sheet Music & Song Books',
            'Stage Lighting & Effects',
            'String',
            'Wind & Woodwind',
            'Equipment',
            'Vintage Musical Instruments',
            'Other'
        ]
    },
    {
        name: 'Pet Supplies',
        categories: [
            'Backyard Poultry Supplies',
            'Bird Supplies',
            'Cat Supplies',
            'Dog Supplies',
            'Fish & Aquariums',
            'Reptile Supplies',
            'Small Animal Supplies ',
            'Pet Memorials & Urns',
            'Other'
        ]
    },
    {
        name: 'Pottery & Glass',
        categories: [
            'Glass',
            'Pottery & China',
            'Other'
        ]
    },
    {
        name: 'Sporting Goods',
        categories: [
            'Boxing Martial Arts & MMA',
            'Cycling',
            'Fishing',
            'Fitness',
            'Hunting',
            'Indoor Games',
            'Outdoor Sports',
            'Team Sports',
            'Tennis & Racquet Sports',
            'Water Sports',
            'Winter Sports',
            'Other'
        ]
    },
    {
        name: 'Tickets & Experiences',
        categories: [
            'Sports Tickets',
            'Concert Tickets',
            'Theater Tickets',
            'Theme Park & Club Passes',
            'Parking Passes',
            'Special Experiences',
            'Other'
        ]
    },
    {
        name: 'Toys & Hobbies',
        categories: [
            'Action Figures',
            'Beanbag Plush',
            'Building Toys',
            'Classic Toys',
            'Collectible Card Games',
            'Diecast & Toy Vehicles',
            'Educational',
            'Electronic',
            'Games',
            'Marbles',
            'Model Railroads & Trains',
            'Models & Kits',
            'Outdoor Toys & Structures ',
            'Preschool Toys & Pretend Play',
            'Puzzles',
            'Radio Control & Control Line ',
            'Robots Monsters & Space Toys',
            'Slot Cars',
            'Stuffed Animals',
            'Toy Soldiers',
            'TV & Movie Character Toys',
            'Vintage & Antique Toys',
            'Other'
        ]
    },
    {
        name:'Travel',
        categories:[
            'Campground & RV Parks',
            'Car Rental',
            'Cruises',
            'Lodging',
            'Luggage',
            'Luggage Accessories',
            'Maps',
            'Rail',
            'Travel Accessories',
            'Other'
        ]
    },
    {
        name:'Video Games & Consoles',
        categories:[
            'Video Games',
            'Video Game Consoles',
            'Video Game Accessories',
            'Manuals Inserts & Box Art',
            'Original Game Cases & Boxes',
            'Prepaid Gaming Cards',
            'Replacement Parts & Tools',
            'Strategy Guides & Cheats',
            'Video Game Merchandise',
            'Other',
        ],
    },
    {
        name: 'Everything Else',
        categories:['Everything Else']
    }
]