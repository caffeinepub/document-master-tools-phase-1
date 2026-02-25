import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

actor {
  include MixinStorage();

  // Document Storage Types and Functions
  type Document = {
    id : Text;
    owner : Principal;
    name : Text;
    blob : Storage.ExternalBlob;
    size : Nat;
    fileType : FileType;
  };

  type FileType = {
    #pdf;
    #word;
    #image;
    #resume;
  };

  module Document {
    public func compareByName(doc1 : Document, doc2 : Document) : Order.Order {
      Text.compare(doc1.name, doc2.name);
    };
  };

  let documentStore = Map.empty<Text, Document>();

  // Resume Types and Functions
  type Resume = {
    id : Text;
    owner : Principal;
    template : ResumeTemplate;
    content : ResumeContent;
    blob : Storage.ExternalBlob;
    lastModified : Int;
  };

  type ResumeTemplate = {
    #fresher;
    #experienced;
    #professional;
    #simple;
    #creative;
  };

  type ResumeContent = {
    personalInfo : PersonalInfo;
    education : [Education];
    experience : [Experience];
    skills : [Skill];
    projects : [Project];
    additionalSections : [Section];
  };

  type PersonalInfo = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  type Education = {
    institution : Text;
    degree : Text;
    year : Text;
  };

  type Experience = {
    company : Text;
    position : Text;
    duration : Text;
    description : Text;
  };

  type Skill = {
    name : Text;
    level : Text;
  };

  type Project = {
    title : Text;
    description : Text;
  };

  type Section = {
    title : Text;
    content : Text;
  };

  module Resume {
    public func compareByLastModified(resume1 : Resume, resume2 : Resume) : Order.Order {
      let d = resume2.lastModified - resume1.lastModified;
      if (d < 0) {
        #less;
      } else if (d > 0) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  let resumeStore = Map.empty<Text, Resume>();

  // Image Metadata Types and Functions
  type ImageMetadata = {
    id : Text;
    owner : Principal;
    name : Text;
    blob : Storage.ExternalBlob;
    size : Nat;
    width : Nat;
    height : Nat;
    format : ImageFormat;
  };

  type ImageFormat = {
    #jpg;
    #png;
    #gif;
    #bmp;
  };

  module ImageMetadata {
    public func compareBySize(img1 : ImageMetadata, img2 : ImageMetadata) : Order.Order {
      Nat.compare(img1.size, img2.size);
    };
  };

  let imageStore = Map.empty<Text, ImageMetadata>();

  // Initialization Function
  // (No explicit init required as persistent structures are already initialized)
};
