import React from "react";

export interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col h-full p-4"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-xl"
      />

      {/* Content */}
      <div className="flex flex-col flex-grow mt-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm mt-2 flex-grow">
          {description.length > 90
            ? description.slice(0, 90) + "..."
            : description}
        </p>

        {/* Button stays at bottom */}
        <button className="text-blue-600 font-medium mt-3 hover:underline self-start">
          Learn more →
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
